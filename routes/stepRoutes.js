// routes/steps.js
import express from 'express';
import { getSteps, getStep, addStep, updateStep, deleteStep } from '../controllers/stepController.js';

const router = express.Router();

router.get('/', getSteps);
router.get('/:id', getStep);
router.post('/', addStep);
router.put('/:id', updateStep);
router.delete('/:id', deleteStep);

export default router;
