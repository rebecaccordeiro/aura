import Job from '../models/Job.js';

export default class JobController {
    static createJob(req, res) {
        res.render('jobs/create')
    }

    static showJobs(req, res) {
        res.render('jobs/all')
    }
};