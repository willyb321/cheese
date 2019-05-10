import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import {tmpdir} from 'os';
import * as responseTime from 'response-time';
import {models} from './models';

const session = require('express-session');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

Auth0Strategy.prototype.authorizationParams = (options: any) => {
  options = options || {};

  let params: any = {};
  if (options.connection && typeof options.connection === 'string') {
    params.connection = options.connection;
  }
  if (options.audience && typeof options.audience === 'string') {
    params.audience = options.audience;
  }
  if (options.prompt && typeof options.prompt === 'string') {
    params.prompt = options.prompt;
  }
  if (options.login_hint && typeof options.login_hint === 'string') {
    params.login_hint = options.login_hint;
  }

  if (options.scope && typeof options.scope === 'string') {
    params.scope = options.scope;
  }

  return params;
};

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuer: 'auth.willb.info',
    scope: 'openid email profile app_metadata user_metadata roles',
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL ||
      'http://localhost:3030/api/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    if (!profile || !profile._json || !profile._json.app_metadata) {
      profile._json.app_metadata = {
        admin: false
      };
    }
    models.User.findOrCreate({
      where: {id: profile.id},
      defaults: {
        nickname: profile.nickname,
        admin: profile._json.app_metadata.admin || false,
        email: profile.emails[0].value
      }
    })
      .spread((user, created) => {
        if (created) {
          console.info(`Created user ${user.nickname}`);
          console.info(JSON.stringify(user));
        }
      })
      .catch(err => {
        console.error(err);
      });
    return done(null, profile);
  }
);
passport.use(strategy);

// Routes
import index from './routes/index';
import image from './routes/image';


const app: express.Application = express();

app.use(responseTime());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(fileUpload({
  safeFileNames: true,
  preserveExtension: 4,
  createParentPath: true,
  // useTempFiles : true,
  // tempFileDir : tmpdir()

}));

const sessionStore = new SequelizeStore({
  db: models.sequelize
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production'
    },
    proxy: process.env.NODE_ENV === 'production',
    store: sessionStore,
    rolling: true
  })
);

sessionStore.sync();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: express.Request, res: express.Response) => {
  return res.send('Hello from generator-willyb-web');
});

app.use('/api/', index);
app.use('/api/i/', image);

export default app;
