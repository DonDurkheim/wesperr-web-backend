import express from "express";
import { addToWaitlist, getWaitlist, deleteFromWaitlist } from '../controllers/waitlist.controller.js';

const router = express.Router();

router.post('/waitlist', addToWaitlist);
router.get('/waitlist', getWaitlist);
router.delete('/waitlist/:id', deleteFromWaitlist);

export default router;
