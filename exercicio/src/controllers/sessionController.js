const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authConfig = require('../config/auth')

const Tarefas = require('../models/Tarefas')

function checkPassword(passwordEntry, password) {
    return bcrypt.compareSync(passwordEntry, password)
}

exports.accessToken = (req, res) => {
    try {
        const { nomeColaborador, password: passwordEntry } = req.body;

        Tarefas.findOne({ nome: nomeColaborador })
            .then((user) => {
                const { id, nome, hashPass } = user;

                try {
                    checkPassword(passwordEntry, hashPass);
                } catch (e) {
                    return res.status(401).json({ error: 'Password is invalid' });
                }

                try {
                    return res.json({
                        user: {
                            id,
                            nome,
                        },
                        token: jwt.sign({ id }, authConfig.secret, {
                            expiresIn: authConfig.expiresIn,
                        }),
                    });
                } catch (e) {
                    return res.status(401).json({ error: 'erro' });
                }

            })
            .catch((e) => {
                return res.status(401).json({ error: 'Colaborador could not be found' });
            });

    } catch (e) {
        return res.status(401).json({ error: 'erro' })
    }
} 