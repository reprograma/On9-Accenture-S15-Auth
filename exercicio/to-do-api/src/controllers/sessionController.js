const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const bcrypt = require("bcrypt");
const Task = require("../models/Tarefas");

function checkPassword(passwordEntry, password) {
  return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (request, response) => {
  try {
    const { name, password: passwordEntry } = request.body;
    Task.findOne({ nomeColaborador: name })
      .then((user) => {
        const { id, nomeColaborador, hashPass } = user;

        try {
          checkPassword(passwordEntry, hashPass);
        } catch (e) {
          return response.status(401).json({ error: "Password does not match." });
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
          return response.status(401).json({ error: "erro" });
        }
      })
      .catch((e) => {
        return response.status(401).json({ error: "Collaborator not found." });
      });
  } catch (e) {
    return response.status(401).json({ error: "erro" });
  }
};