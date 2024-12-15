import User from '../models/User.js';
import Ngo from '../models/Ngo.js';
import Job from '../models/Job.js';
import UserJob from '../models/UserJob.js';

export default class UserController {
    static createUser(req, res) {
        res.render('users/create')
    }

    static showUsers(req, res) {
        res.render('users/all')
    }

    static async editUser(req, res) {
        const id = req.params.id;
    
        try {
            const user = await User.findOne({ where: { id: id } });
    
            if (!user) {
                req.flash('message', 'Usuário não encontrado.');
            }
    
            // converts user to json
            const userData = user.toJSON();
    
            res.render('users/edit', { user: userData });
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).send('Internal server error');
        }
    }

    static async userProfile(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'fname', 'lname', 'city', 'state', 'email', 'phonenumber'],
            plain: true,
        })

        if (!user) {
            res.redirect('/login')
        }

        const userData = user.toJSON();

        const userApplications = await UserJob.findAll({
            where: { userid: userId },
            attributes: ['jobid']
        });

        const appliedJobIds = userApplications.map(app => app.jobid);

        const appliedJobs = await Job.findAll({
            where: {
                id: appliedJobIds
            },
            include: [
                { model: Ngo, attributes: ['name'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        const appliedJobsData = appliedJobs.map(job => job.toJSON());

        res.render('users/profile', { userData, jobs: appliedJobsData });
    } catch (error) {
        console.error('Erro ao carregar o perfil do usuário:', error);
        res.status(500).send('Erro ao carregar o perfil do usuário.');
    }

    static async updateUser(req, res) {
        const id = req.params.id;
        const { fname, lname, email, city, state, birthday, phonenumber } = req.body;
        const userId = req.session.userid
        
        try {
            const user = await User.findOne({ where: { id: userId } });
    
            if (!user) {
                req.flash('message', 'Usuário não encontrado.');
            }
    
            await User.update(
                {
                    fname,
                    lname,
                    email,
                    city,
                    state,
                    birthday,
                    phonenumber
                },
                { where: { id } }
            );
    
            req.session.save(() => {
                res.redirect('/users/profile')
            })
            
        } catch (error) {
            console.error("Erro ao atualizar o cadastro do usuário:", error);
            res.status(500).send('Internal server error');
        }
    }

    static async deleteUser(req, res) {
        const userId = req.session.userid

        try {
            await User.destroy({ where: { id: userId } });
            req.flash('message', 'Usuário excluído com sucesso.')

            req.session.save(() => {
                res.redirect('/login')
            })

        } catch (err) {
            console.log('O usuário não pôde ser excluído.' + err);
        }
    }
};