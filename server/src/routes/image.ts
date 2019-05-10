import * as express from 'express';
import {models} from '../models';
import {join, extname} from 'path';
const fs = require('fs-extra');

const router: express.Router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	return res.send('Hello from generator-willyb-web');
});

router.get('/:id', async (req, res) => {
	let img;
	try {
		img = await models.Image.findAll({
			where: {
				shortId: req.params.id
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error!');
	}
	console.log(img);
	if (img && img[0]) {
		img = img[0];
		console.log(img);
		const hash = img.fileHash.slice(-4);
		const dir = join(__dirname, '../..', 'uploads', hash);
		const file = join(dir, img.id.toString());
		res.type('jpg');
		return res.sendFile(file);
	}
	return res.status(404).send('No image found');
});

router.post('/upload', async (req: any, res) => {
	if (Object.keys(req.files).length == 0) {
		return res.status(400).send('No files were uploaded.');
	}

	// The name of the input field (i.e. "image") is used to retrieve the uploaded file
	let image: any = req.files.file;

	console.log(image);
	const model = await models.Image.create({
		fileExt: extname(image.name),
		originalName: image.name,
		fileHash: image.md5,
		userId: 1
	});
	const hash = image.md5.slice(-4);
	const dir = join(__dirname, '../..', 'uploads', hash);
	const file = join(dir, model.id.toString());
	try {
		await fs.ensureDir(dir);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Internal server error!');
	}
	console.log(file);

	// Use the mv() method to place the file somewhere on your server
	image.mv(file, err => {
		if (err) {
			console.log(err);
			return res.status(500).send('Internal server error!');
		}
		return res.json({imageId: model.shortId});
		return res.send('File uploaded!');
	});
	// return res.json(req.files);
});

export default router;
