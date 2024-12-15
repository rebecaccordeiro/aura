import express from "express";
const router = express.Router();

import JobController from '../controllers/JobController.js';

import { checkAuth } from "../helpers/auth.js";

router.get('/', JobController.board);
router.get('/board', JobController.board);
router.get('/myjobs', checkAuth, JobController.myJobs);
router.post('/myjobs', JobController.publishJob)
router.get('/edit/:id', checkAuth, JobController.editJob)
router.post('/edit/:id', checkAuth, JobController.updateJob);
router.post('/delete', checkAuth, JobController.deleteJob)
router.post('/apply/:id', checkAuth, JobController.applyToJob);
router.post('/unapply/:id', checkAuth, JobController.unapplyToJob);
//router.get('/userjobs', checkAuth, JobController.showUserJobs);

export default router;