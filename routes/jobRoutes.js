import express from "express";
const router = express.Router();

import JobController from '../controllers/JobController.js';

router.get('/add', JobController.createJob);
router.get('/', JobController.showJobs);

export default router;