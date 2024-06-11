import multer from 'multer';
import path from 'path';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS,
        secretAccessKey: process.env.BUCKET_SECRET
    },
    region: process.env.AWS_REGION
});

const storage = multerS3({
    s3: s3Client,
    bucket: "lab-23-bucket",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const labId = req.params.labId; // Get labId from request parameters
        const fileName = `${Date.now().toString()}${path.extname(file.originalname)}`;
        const fullPath = `source_code/${labId}/${fileName}`; // Construct the full path
        cb(null, fullPath);
    }
});

function checkFileType(file, cb) {
    const filetypes = /zip/; // Only allow zip files
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Only zip files are allowed!');
    }
}

const uploadZip = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

const uploadZipMiddleWare = uploadZip;

export default uploadZipMiddleWare;
