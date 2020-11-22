const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const bcrypt = require("bcrypt");
const Colaborador = require("../models/Colaborador");

function checkPassword(passwordEntry, password) {
  return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (req, res) => {
  try {
    const { nome, password: passwordEntry } = req.body;

    Colaborador.findOne({ nome: nome })
      .then((user) => {
        const { id, nome, hashPass } = user;

        try {
          checkPassword(passwordEntry, hashPass); //comparando a senha de entrada com a do banco
        } catch (e) {
          return res.status(401).json({ error: "password does not match" });
        }

        try {
          return res.json({
            //se a senha conferiu, retorna id e nome do usuário
            user: {
              id,
              nome,
            },
            token: jwt.sign({ id }, authConfig.secret, {
              //gera o token a partir do id
              expiresIn: authConfig.expiresIn,
            }),
          });
        } catch (e) {
          return res.status(500).json({ error: "erro" });
        }
      })
      .catch((e) => {
        return res.status(404).json({ error: "user not found" });
      });
  } catch (e) {
    return res.status(500).json({ error: "erro" });
  }
};
