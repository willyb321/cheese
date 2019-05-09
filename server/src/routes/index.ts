import * as express from 'express';
import * as passport from 'passport';
import {secured} from '../utils';

const router: express.Router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  return res.send('Hello from generator-willyb-web');
});


router.get(
  '/auth',
  passport.authenticate('auth0', {
    scope: 'openid email profile app_metadata user_metadata roles'
  }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get(
  '/callback',
  passport.authenticate('auth0', {failureRedirect: '/api/auth'}),
  (req, res) => {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect('/');
  }
);

router.get('/checkauth', secured, (req, res) => {
  return res.status(200).json({
    status: 'Login successful!',
    user: req.user,
    admin: req.user.admin
  });
});

export default router;
