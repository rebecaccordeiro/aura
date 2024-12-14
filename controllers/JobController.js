import Job from '../models/Job.js';
import Ngo from '../models/Ngo.js';

export default class JobController {
    static async board(req, res) {
        res.render('jobs/board')
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
};