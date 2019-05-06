import * as express from 'express';

const router: express.Router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	return res.send('Hello from generator-willyb-web')
});

export default router;
