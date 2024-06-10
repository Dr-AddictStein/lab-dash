import multer from 'multer';
import path from 'path';
import util from 'util';
import { S3Client } from '@aws-sdk/client-s3';

import multerS3 from 'multer-s3';

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS,
        secretAccessKey: process.env.BUCKET_SECRET
    },
    region: process.env.AWS_REGION
})


const storage = multerS3({
    s3: s3Client,
    bucket: "lab-23-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
})


function checkFileType(file, cb) {

    console.log("FHFHF",file);

    const filetypes = /jpeg|jpg|png|gif|mp4|mov|png/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);


    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images only (jpeg, jpg, png, gif, mp4, mov, png)!');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

const uploadMiddleWare = upload;

export default uploadMiddleWare;