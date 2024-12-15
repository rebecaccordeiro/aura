import Job from '../models/Job.js';
import Ngo from '../models/Ngo.js';
import User from '../models/User.js';
import UserJob from '../models/UserJob.js';

export default class JobController {
    static async board(req, res) {
        const userId = req.session.userid;

        try {
            const jobs = await Job.findAll({
                where: { active: true },
                include: [
                    { model: Ngo, attributes: ['name'] }
                ],
                order: [['createdAt', 'DESC']]
            });
    
            let appliedJobs = [];

        if (userId) {
            const userApplications = await UserJob.findAll({
                where: { userid: userId },
                attributes: ['jobid']
            });
            appliedJobs = userApplications.map(app => app.jobid);
        }

        const jobsData = jobs.map((job) => {
            const jobJson = job.toJSON();
            return {
                ...jobJson,
                isApplied: appliedJobs.includes(jobJson.id)
            };
        });

        res.render('jobs/board', { jobs: jobsData });
        } catch (error) {
            console.error('Erro ao carregar o mural de jobs:', error);
            res.status(500).send('Erro ao carregar o mural de trabalhos voluntários.');
        }
    }

    static async myJobs(req, res) {
        const ngoId = req.session.ngoid

        const ngo = await Ngo.findOne({
            where: {
                id: ngoId,
            },
            include: Job,
            plain: true,
        })

        // check if NGO exists
        if (!ngo) {
            res.redirect('/login')
        }

        const jobs = ngo.Jobs.map((result) => result.dataValues)

        console.log(jobs)
        
        res.render('jobs/myjobs', { jobs })
    }

    static async publishJob(req, res) {
        const { title, description, remote, city, state, addressstreet, addressnumber, addresscomplement, zipcode, vacancies } = req.body
        const ngoid = req.session?.ngoid;

        const job = {
            title,
            description,
            remote: remote === 'on' || false,
            city: city || null,
            state: state || null,
            addressstreet: addressstreet || null,
            addressnumber: addressnumber || null,
            addresscomplement: addresscomplement || null,
            zipcode: zipcode || null,
            vacancies,
            active: true,
            ngoid: ngoid
        }

        try {
            const createdJob = await Job.create(job)

            req.flash('message', 'Trabalho voluntário publicado com sucesso!')

            req.session.save(() => {
                res.redirect('myjobs')
            })
            
        } catch(err) {
            console.log(err)
            res.status(500).send('Erro ao criar trabalho voluntário');
        }
    }

    static async editJob(req, res) {
        const id = req.params.id;
    
        try {
            const job = await Job.findOne({ where: { id: id } });
    
            if (!job) {
                req.flash('message', 'Trabalho voluntário não encontrado.');
            }
    
            // converts job to json
            const jobData = job.toJSON();
    
            res.render('jobs/edit', { job: jobData });
        } catch (error) {
            console.error("Error fetching job:", error);
            res.status(500).send('Internal server error');
        }
    }

    static async updateJob(req, res) {
        const id = req.params.id;
        const { title, description, remote, city, state, addressstreet, addressnumber, addresscomplement, zipcode, vacancies } = req.body;

        const remoteValue = remote === 'on';
        
        try {
            const job = await Job.findOne({ where: { id: id } });
    
            if (!job) {
                req.flash('message', 'Trabalho voluntário não encontrado.');
            }
    
            await Job.update(
                {
                    title,
                    description,
                    remote: remoteValue,
                    city: city || null,
                    state: state || null,
                    addressstreet: addressstreet || null,
                    addressnumber: addressnumber || null,
                    addresscomplement: addresscomplement || null,
                    zipcode: zipcode || null,
                    vacancies,
                },
                { where: { id } }
            );
    
            req.session.save(() => {
                res.redirect('/jobs/myjobs')
            })
            
        } catch (error) {
            console.error("Erro ao atualizar o trabalho voluntário:", error);
            res.status(500).send('Internal server error');
        }
    }

    static async deleteJob(req, res) {
        const id = req.body.id;
        const ngoid = req.session?.ngoid;

        try {
            await Job.destroy({ where: { id: id, ngoid: ngoid } });
            req.flash('message', 'Trabalho voluntário excluído com sucesso.')

            req.session.save(() => {
                res.redirect('myjobs')
            })

        } catch (err) {
            console.log('O trabalho voluntário não pôde ser excluído.' + err);
        }
    }

    static async applyToJob(req, res) {
        const jobId = req.body.jobid;
        const userId = req.session.userid;

        try {
            const job = await Job.findOne({ where: { id: jobId } });

            if (!job) {
                req.flash('message', 'Trabalho voluntário não encontrado.');
                return res.redirect('/jobs/board');
            }

            if (job.vacancies <= 0 || !job.active) {
                req.flash('message', 'Não há mais vagas disponíveis para este trabalho.');
                return res.redirect('/jobs/board');
            }

            const existingApplication = await UserJob.findOne({
                where: {
                    userid: userId,
                    jobid: jobId,
                },
            });

            if (existingApplication) {
                req.flash('message', 'Você já se candidatou a este trabalho!');
                return res.redirect('/jobs/board');
            }

            await UserJob.create({
                userid: userId,
                jobid: jobId,
            });

            job.vacancies -= 1;
            if (job.vacancies === 0) {
                job.active = false;
            }
            await job.save();

            req.flash('message', 'Você se candidatou com sucesso!');
            res.redirect('/jobs/board');
        } catch (error) {
            console.error('Erro ao se candidatar ao trabalho:', error);
            req.flash('message', 'Ocorreu um erro ao processar sua candidatura.');
            res.redirect('/jobs/board');
        }
    }

    static async unapplyToJob(req, res) {
        const jobId = req.body.jobid;
        const userId = req.session.userid;
    
        try {
            const application = await UserJob.findOne({
                where: { userid: userId, jobid: jobId },
            });
    
            if (!application) {
                req.flash('message', 'Você não está cadastrado neste trabalho.');
                return res.redirect('/jobs/board');
            }
    
            await application.destroy();
    
            const job = await Job.findOne({ where: { id: jobId } });
            if (job) {
                job.vacancies += 1;
                job.active = true;
                await job.save();
            }
    
            req.flash('message', 'Você retirou sua candidatura com sucesso.');
            res.redirect('/jobs/board');
        } catch (error) {
            console.error('Erro ao retirar candidatura:', error);
            req.flash('message', 'Ocorreu um erro ao processar sua solicitação.');
            res.redirect('/jobs/board');
        }
    }    
    
};