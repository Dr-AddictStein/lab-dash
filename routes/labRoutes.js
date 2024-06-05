// routes/labCollections.js
import express from 'express';
import { getLabCollections, getLabCollection, addLabCollection, updateLabCollection, deleteLabCollection } from '../controllers/labController.js';

const router = express.Router();

router.get('/', getLabCollections);
router.get('/:id', getLabCollection);
router.post('/', addLabCollection);
router.put('/:id', updateLabCollection);
router.delete('/:id', deleteLabCollection);

export default router;
