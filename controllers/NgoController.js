import Ngo from '../models/Ngo.js';
import Job from '../models/Job.js';

export default class NgoController {
    static createNgo(req, res) {
        res.render('ngos/create')
    }

    static showNgos(req, res) {
        res.render('ngos/all')
    }

    static async ngoPage(req, res) {
        const ngoId = req.session.ngoid

        const ngo = await Ngo.findOne({
            where: { id: ngoId },
            attributes: ['id', 'name', 'city', 'state', 'addressstreet', 'addressnumber', 'addresscomplement', 'email', 'phonenumber'],
            plain: true,
        })

        if (!ngo) {
            res.redirect('/login')
        }

        const ngoData = ngo.toJSON();

        const ngoJobs = await Job.findAll({
            where: { ngoid: ngoId },
            order: [['createdAt', 'DESC']]
        });

        const jobsData = ngoJobs.map(job => job.toJSON());

        res.render('ngos/page', { ngoData, jobs: jobsData });
    // } catch (error) {
    //     console.error('Erro ao carregar a página da ONG:', error);
    //     res.status(500).send('Erro ao carregar a página da ONG.');
    }

    static async editNgo(req, res) {
        const id = req.params.id;
    
        try {
            const ngo = await Ngo.findOne({ where: { id: id } });
    
            if (!ngo) {
                req.flash('message', 'ONG não encontrada.');
            }
    
            const ngoData = ngo.toJSON();
            console.log(ngoData);
    
            res.render('ngos/edit', { ngo: ngoData });
        } catch (error) {
            console.error("Error fetching NGO:", error);
            res.status(500).send('Internal server error');
        }
    }

    static async updateNgo(req, res) {
        const id = req.params.id;
        const { name, cnpj, email, city, state, addressstreet, addressnumber, addresscomplement, zipcode, phonenumber } = req.body;
        const ngoId = req.session.ngoid;
        
        try {
            const ngo = await Ngo.findOne({ where: { id: ngoId } });
    
            if (!ngo) {
                req.flash('message', 'ONG não encontrada.');
            }
    
            await Ngo.update(
                {
                    name,
                    cnpj,
                    email,
                    city,
                    state,
                    addressstreet,
                    addressnumber,
                    addresscomplement,
                    zipcode,
                    phonenumber
                },
                { where: { id } }
            );
    
            req.session.save(() => {
                res.redirect('/ngos/page')
            })
            
        } catch (error) {
            console.error("Erro ao atualizar o cadastro da ONG:", error);
            res.status(500).send('Internal server error');
        }
    }

    static async deleteNgo(req, res) {
        const ngoId = req.session.ngoid

        try {
            await Ngo.destroy({ where: { id: ngoId } });
            req.flash('message', 'ONG excluída com sucesso.')

            req.session.save(() => {
                res.redirect('/login')
            })

        } catch (err) {
            console.log('A ONG não pôde ser excluída.' + err);
        }
    }
};