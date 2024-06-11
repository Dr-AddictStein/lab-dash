import express from 'express';

import uploadMiddleWare from "../middlewares/fileUpload.js";
import { createImage } from '../controllers/fileController.js';
import uploadZipMiddleWare from "../middlewares/sourceCodeUpload.js";
import { createSourceCode } from '../controllers/sourceCodeController.js';


const router = express.Router();

router.post('/image/:labId',uploadMiddleWare.single("file"),createImage);
router.post('/source_code/:labId', uploadZipMiddleWare.single("file"), createSourceCode);

export default router;

