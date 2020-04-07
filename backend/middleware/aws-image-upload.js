const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const dotenv = require('dotenv')
const path = require( 'path' )

dotenv.config();

aws.config.update( {
    secretAccessKey : process.env.SECERET_ACCESS_KEY,
    accessKeyId : process.env.ACCESS_KEY_ID,
    region : 'us-east-1',
   
})
const s3 = new aws.S3( {
  accessKeyId : 'ASIAWR4PERHU5W4D5YE2',
  secretAccessKey : 'UH23QhPTbq+yJXQkAZDwUojMUfh3ya/pAGkUIPpQ',
  region : 'us-east-1'
})

function checkFileType( file, cb ){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
  // Check mime
  const mimetype = filetypes.test( file.mimetype );
 if( mimetype && extname ){
   return cb( null, true );
  } else {
   cb( 'Error: Images Only!' );
  }
 }
 
 const profileImgUpload = multer({
  storage: multerS3({
   s3: s3,
   bucket: 'onclick',
   acl: 'public-read',
   key: function (req, file, cb) {
    cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
   }
  }),
  limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function( req, file, cb ){
   checkFileType( file, cb );
  }
 }).single('image');

module.exports = profileImgUpload