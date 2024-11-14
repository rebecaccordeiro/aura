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
        
        res.render('jobs/myjobs')
    }

    static async publishJob(req, res) {
        const { title, description, remote, city, state, addressstreet, addressnumber, addresscomplement, zipcode, vacancies } = req.body
        const ngoid = req.session?.ngoid; 

        const job = {
            title,
            description,
            remote,
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
};