const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const bcrypt = require("bcrypt");
const Task = require("../model/Tarefa");

function checkPassword(passwordEntry, password) {
  return bcrypt.compareSync(passwordEntry, password);
}

exports.accessToken = (request, response) => {
  try {
    const { nomeColaborador, password: passwordEntry } = request.body;
    Task.findOne({ nomeColaborador: nomeColaborador})
      .then((user) => {
        const { id, nomeColaborador, hashPass } = user;

        try {
          checkPassword(passwordEntry, hashPass);
        } catch (e) {
          return response.status(401).json({ error: "Senha incorreta." });
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
        return response.status(401).json({ error: "Collaborato não encontrado." });
      });
  } catch (e) {
    return response.status(401).json({ error: "erro" });
  }
}; 