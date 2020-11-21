const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require("bcrypt");
const User = require('../models/Users');

function checkPassword(passwordEntry, password) {
    return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (req, res) => {
    try {
        const { name, password: passwordEntry } = req.body;

        User.findOne({ nome: name })
            .then((user) => {
                const { id, nome, email, password } = user;

                try {
                    checkPassword(passwordEntry, password);
                } catch (e) {
                    return res.status(401).json({ error: 'password does not match' });
                }

                try {
                    return res.json({
                        user: {
                            id,
                            nome,
                            email,
                        },
                        token: jwt.sign({ id }, authConfig.secret, {
                            expiresIn: authConfig.expiresIn,
                        }),
                    });
                } catch (e) {
                    return res.status(401).json({ error: 'erro no retorno' });
                }

            })
            .catch((e) => {
                return res.status(401).json({ error: 'user not found' });
            });

    } catch (e) {
        return res.status(401).json({ error: 'erro' });
    }
}