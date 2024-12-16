import User from '../models/User.js';
import Ngo from '../models/Ngo.js';

import bcrypt from "bcryptjs";

export default class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const {email, password} = req.body;
    
        // Procurar usuário na tabela User
        let user = await User.findOne({ where: { email } });
        let userType = 'user';
    
        // Se não encontrado, procurar na tabela Ngo
        if (!user) {
            user = await Ngo.findOne({ where: { email } });
            userType = 'ngo';
        }
    
        // Se nenhum usuário for encontrado
        if (!user) {
            req.flash('message', 'Usuário não encontrado.');
            res.render('auth/login');
            return;
        }
    
        // Checar se a senha é válida
        const passwordMatch = bcrypt.compareSync(password, user.password);
    
        if (!passwordMatch) {
            req.flash('message', 'Senha inválida.');
            res.render('auth/login');
            return;
        }
    
        // Inicializar sessão com base no tipo de usuário
        if (userType === 'user') {
            req.session.userid = user.id;
        } else if (userType === 'ngo') {
            req.session.ngoid = user.id;
        }
    
        req.flash('message', 'Autenticação realizada com sucesso!');
        req.session.save(() => {
            res.redirect('/');
        });
    }

    static register(req, res) {
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { fname, lname, email, password, confirmpassword, city, state, birthday, phonenumber } = req.body

        // password match validation
        if(password != confirmpassword) {
            // message
            req.flash('message', 'As senhas não conferem, tente novamente.')
            res.render('auth/register')

            return
        }

        // check if user exists
        const checkIfUserExists = await User.findOne({where: {email: email}})

        if(checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso.')
            res.render('auth/register')

            return
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            fname,
            lname,
            email,
            password: hashedPassword,
            city,
            state,
            birthday,
            phonenumber
        }

        try {
            const createdUser = await User.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch(err) {
            console.log(err)
        }
    }

    static registerngo(req, res) {
        res.render('auth/registerngo')
    }

    static async registerngoPost(req, res) {
        const { name, cnpj, email, password, confirmpassword, city, state, addressstreet, addressnumber, addresscomplement, zipcode, phonenumber } = req.body

        // password match validation
        if(password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente.')
            res.render('auth/register')

            return
        }

        const checkIfNgoExists = await Ngo.findOne({where: {email: email}})

        if(checkIfNgoExists) {
            req.flash('message', 'O e-mail já está em uso.')
            res.render('auth/register')

            return
        }

        // create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const ngo = {
            name,
            cnpj,
            email,
            password: hashedPassword,
            city,
            state,
            addressstreet,
            addressnumber,
            addresscomplement,
            zipcode,
            phonenumber
        }

        try {
            const createdNgo = await Ngo.create(ngo)

            // initialize session
            req.session.ngoid = createdNgo.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch(err) {
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
};