import express from 'express';
import { createFreelanceGig, getAllFreelanceGigs, filterFreelanceGigs,applyForGig,selectFreelancers, getFreelanceGigById } from '../controllers/freelanceGigController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create',isAuthenticated, createFreelanceGig);
router.get('/getall', getAllFreelanceGigs);
router.get('/get/:id', getFreelanceGigById);
router.get('/filter', filterFreelanceGigs);
router.post('/:id/apply', applyForGig);
router.post('/:id/select', selectFreelancers);
export default router;  // Add this line to make it a default export
