const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization; //pega no header o token de autenticação

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided" }); //se não tem token retorna o erro
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); //verifica se o token confere com o segredo
    req.userId = decoded.id; //adiciona na requisição um item userId com o ID do usuário
    return next(); //passar para o próximo item na rota
  } catch (err) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
