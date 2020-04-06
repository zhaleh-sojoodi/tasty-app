const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const dotenv = require('dotenv');

dotenv.config();

aws.config.update( {
    secretAccessKey : process.env.SECERET_ACCESS_KEY,
    accessKeyId : process.env.ACCESS_KEY_ID,
    region : 'us-east-1'
})
const s3 = new aws.S3({  })
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'recipe-final-project',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'Testing'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload