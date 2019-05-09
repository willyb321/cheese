import * as express from 'express';
import multer = require('multer');
import {models} from '../models';

const router: express.Router = express.Router();

const upload = multer({ dest: 'uploads/' });


router.get('/', (req: express.Request, res: express.Response) => {
	return res.send('Hello from generator-willyb-web')
});

router.post('/up', upload.single('image'), (req, res) => {

});

export default router;
