const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const bcrypt = require("bcrypt");
const Task = require("../models/Tarefas");
const Tarefas = require("../../../../On9-Accenture-S13-Backend-BD/to-do-api/src/models/Tarefas");

function checkPassword(passwordEntry, password) {
  return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (request, response) => {
  try {
    const { nameColaborador, password: passwordEntry } = request.body;

    Tarefas.findOne({ nomeColaborador: nameColaborador })
      .then((user) => {
        const { id, nomeColaborador, hashPass } = user;

        try {
          checkPassword(passwordEntry, hashPass);
        } catch (e) {
          return response
            .status(401)
            .json({ error: "password does not match" });
        }

        try {
          return response.json({
            user: {
              id,
              nomeColaborador,
            },
            token: jwt.sign({ id }, authConfig.secret, {
              expiresIn: authConfig.expiresIn,
            }),
          });
        } catch (e) {
          return res.status(401).json({ error: "erro" });
        }
      })
      .catch((e) => {
        return res.status(401).json({ error: "user not found" });
      });
  } catch (e) {
    return res.status(401).json({ error: "erro" });
  }
};
