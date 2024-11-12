import User from '../models/User.js';

import bcrypt from "bcryptjs";

export default class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }

    static async loginPost(req, res) {
        const {email, password} = req.body
        // find user
        const user = await User.findOne({where: {email: email}})
        // const ngo = await Ngo.findOne({where: {email: email}})
        if(!user) /* & if(!ngo) */ {
            // message
            req.flash('message', 'Usuário não encontrado.')
            res.render('auth/login')

            return
        }

        // check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password) /* || ngo.password */ 

        if(!passwordMatch) {
            // message
            req.flash('message', 'Senha inválida.')
            res.render('auth/login')

            return
        }

        // initialize session
        req.session.userid = user.id
        // req.session.ngoid = ngo.id

        req.flash('message', 'Autenticação realizada com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })
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
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            // initialize session
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            res.redirect('/');
        } catch(err) {

        }

        await User.create(user)
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
};