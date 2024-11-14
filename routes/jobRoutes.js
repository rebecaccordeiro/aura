import express from "express";
const router = express.Router();

import JobController from '../controllers/JobController.js';

import { checkAuth } from "../helpers/auth.js";

router.get('/', JobController.board);
router.get('/board', checkAuth, JobController.board);
router.get('/myjobs', checkAuth, JobController.myJobs);
router.post('/myjobs', JobController.publishJob)

export default router;