const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require('bcrypt');
const Tasks = require('../models/Tarefas');

function checkPassword(passwordEntry, password) {
    return bcrypt.compareSync(passwordEntry, password)
}
exports.accessToken = (req, res) => {
    try {
        const { nomeColaborador, password: passwordEntry } = req.body;
        Tasks.findOne({ nome: nomeColaborador })
            .then((user) => {
                const { id, nome, hashPass } = user;
                try {
                    checkPassword(passwordEntry, hashPass);
                } catch (e) {
                    return res.Tasks(401).json({ error: 'passoword does not match' });
                }
                try {
                    return res.json({
                        tarefa: {
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
                return res.status(401).json({ error: 'task not found' })
            })
    } catch (e) {
        return res.status(401).json({ error: 'erro' })
    }
}