const Minio = require('minio');

export const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_HOSTNAME,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: JSON.parse(process.env.MINIO_SSL),
  accessKey: process.env.MINIO_KEY,
  secretKey: process.env.MINIO_SECRET
});

minioClient.bucketExists(process.env.MINIO_BUCKET, (err, exists) => {
  if (err) {
    return console.log(err);
  }
  if (exists) {
    return console.log('Bucket exists.');
  }
  console.log(`Making bucket ${process.env.MINIO_BUCKET}`);
  minioClient.makeBucket(process.env.MINIO_BUCKET, 'us-east-1', err => {
    if (err) {
      console.error(err);
    }
  });
});


export function secured(req, res, next) {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  return res.redirect('/api/auth');
}

