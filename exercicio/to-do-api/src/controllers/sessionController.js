const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const bcrypt = require('bcrypt')
const Task = require('../models/Tarefas')


function checkPassword(passwordEntry, password) {
    return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (require, response) => {
    try {
        const { nomeColaborador, password: passwordEntry } = require.body;

        Task.findOne({ nome: nomeColaborador })
            .then((user) => {
                const { id, nome, hashPass } = user;

                try {
                    checkPassword(passwordEntry, hashPass);
                } catch (e) {
                    return response.status(401).json({ error: 'Senha não confere' });
                }
                try {
                    return response.json({
                        user: {
                            id,
                            nome,
                        },
                        token: jwt.sign({ id }, authConfig.secret, {
                            expiresIn: authConfig.expiresIn,
                        }),
                    });
                } catch (e) {
                    return response.status(401).json({ error: 'erro' });
                }
            })
            .catch((e) => {
                return response.status(401).json({ error: 'Colaborador não encontrado' });
            });
    } catch (e) {
        return response.status(401).json({ error: 'erro' })
    }
}