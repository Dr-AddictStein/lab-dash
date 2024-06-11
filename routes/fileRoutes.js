import express from 'express';

import uploadMiddleWare from "../middlewares/fileUpload.js";
import uploadZipMiddleWare from "../middlewares/sourceCodeUpload.js";
import uploadMiddleWareStepImage from '../middlewares/stepImageUpload.js';
import { createImage, createSourceCode, createStepImage } from '../controllers/fileController.js';


const router = express.Router();

router.post('/image/:labId',uploadMiddleWare.single("file"), createImage);
router.post('/source_code/:labId', uploadZipMiddleWare.single("file"), createSourceCode);
router.post('/stepImage/:labId/:stepId', uploadMiddleWareStepImage.single("file"), createStepImage);

export default router;

