const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Student = require('../app/models/Student');
require("dotenv").config();

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  },
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    acl: 'public-read',
    key: async function (req, file, cb) {
      const student = await Student.findByPk(req.params.id);

      if (!student) {
        throw new Error("There is no student with id " + req.params.id);
      }

      cb(null, `fotos/${req.params.id}-photo-${file.originalname}`)
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  })
})
module.exports = upload;
