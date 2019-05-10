import * as express from 'express';
import {models} from '../models';
import {join, extname} from 'path';

const router: express.Router = express.Router();


router.get('/', (req: express.Request, res: express.Response) => {
  return res.send('Hello from generator-willyb-web');
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
    userId: 1
  });
  const folderId = Math.ceil(model.id / 1000);
  const path = join(__dirname, 'uploads', folderId.toString(), model.id);
  console.log(path);

  // Use the mv() method to place the file somewhere on your server
  image.mv(path, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.send('File uploaded!');
  });
  // return res.json(req.files);
});

export default router;
