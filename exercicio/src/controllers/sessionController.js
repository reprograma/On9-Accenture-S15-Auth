const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const Tasks = require('../models/Tasks')


function checkPassWord(passwordEntry, password) {
    return bcrypt.compareSync(passwordEntry, password)
}

const accessToken = async (request, response) => {
    try {
        const { nomeColaborador, password: passwordEntry } = request.body;

        Tasks.findOne({ nomeColaborador: nomeColaborador })
            .then((user) => {
                const { id, nomeColaborador, hashPass } = user;
                try {
                    checkPassWord(passwordEntry, hashPass)
                } catch (err) {
                    return response.status(401).json({ error: 'wrong password' })
                }

                try {
                    return response.status(200).json({
                        user: {
                            id,
                            nomeColaborador
                        },
                        token: jwt.sign({ id }, authConfig.secret, {
                            expiresIn: authConfig.expiresIn
                        })
                    })
                } catch (err) {
                    return response.status(401).json({ error: err })
                }
            })
            .catch((e) => {
                return response.status(401).json({
                    message: `Sorry! The Colaborator's name that you are looking for wasn't found in our database`
                })
            })

    }
    catch (error) {
        response.status(500).json({ message: error })
    }
}


module.exports = {
    accessToken
}