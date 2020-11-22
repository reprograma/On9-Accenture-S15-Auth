const jwt = require('jsonwebtoken');
const authConfig = require ('../config/auth');
const bcrypt = require("bcrypt");
const Task = require("../model/Task")
//const Alunas = require('../model/Alunas');

function checkPassword(passwordEntry, password) {
  return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (req, res) => {
  try {
    const { name, password: passwordEntry } = req.body;
      
    Task.findOne({name: name})
      .then((user) => {
          const {id, name, hashPass } = user;

          try {
            checkPassword(passwordEntry, hashPass);
          } catch(e) {
            return res.status(401).json({ error: 'password does not match' });
          }

          try {
            return res.json({
              user: {
                id,
                name,
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
        return res.status(401).json({ error: 'user not found' });
      });

  } catch (e) {
    return res.status(401).json({ error: 'erro' });
  }
}