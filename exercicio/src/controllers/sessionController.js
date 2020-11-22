const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const bcrypt = require("bcrypt");
const Tarefas = require('../model/Tarefas')

function checkPassword(passwordEntry, password){
    return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (req, res) => {
    try{
        const {nomeColaborador, password: passwordEntry} = req.body

        Alunas.findOne({nomeColaborador: nomeColaborador})
        .then((user)=>{
            const {id, nomeColaborador, hashPass} = user;

            try{
                checkPassword(passwordEntry, hashPass);
            } catch(e){
                return res.status(401).json({error: 'Password does not match!'})
            }

            try{
                return res.json({
                    user: {
                        id,
                        nomeColaborador,
                    },
                    token: jwt.sign({id}, authConfig.secret, {
                        expiresIn: authConfig.expiresIn,
                    }),
                });
            } catch (e){
                return res.status(500).json({error: 'Ops! Error Generating Token!'});
            }
        }).catch((e)=>{
            return res.status(401).json({error: 'User not found!'});
        })

    } catch (e){
        return res.status(500).json({error: 'Error'});
    }
}