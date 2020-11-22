const { res, req } = require("express")
const mongoose = require("mongoose")
const { signupSchema } = require('../validators/user')
const User = require('../models/Users')
const bcrypt = require("bcrypt");
const bcryptSalt = 8;

const getAll = (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((err) => {
            res.status(400).json(err)
        })

}

const getById = (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(err => next(err));
}

const postUser = async(req, res, next) => {
    const { nome, email, password } = req.body;
    const salt = bcrypt.genSaltSync(bcryptSalt)
    try {

        const validatedBody = await signupSchema.validate(req.body)

        // 2- Criar o nosso usuário com o Model User
        const user = new User(validatedBody)

        // 3 - Procuramos se existe algum usuário no banco com esse e-mail
        User.findOne({ email: validatedBody.email })
            .then(async existingUser => {
                // 4 - Verificar se existe algum usuário com esse e-mail
                if (existingUser) {
                    // Se existir, retornamos um erro
                    return res.status(400).json({
                        errors: ['Já existe uma conta com esse e-mail']
                    })
                }

                const hashPass = await bcrypt.hashSync(password, salt)

                user.password = hashPass
                user.save()
                    .then((user) => {
                        res.status(201).json(user)
                    })
                    .catch(err => next(err))
            })
            .catch((err) => {
                res.status(400).json(err)
            })

    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }
}



module.exports = {
    getAll,
    getById,
    postUser,
}