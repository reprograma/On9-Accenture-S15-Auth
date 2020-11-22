const mongoose = require("mongoose");
const Colaborador = require("../models/Colaborador");
const bcrypt = require("bcrypt");
const bcryptSalt = 8;

exports.post = async (req, res, next) => {
  const { nome, password } = req.body;
  const salt = bcrypt.genSaltSync(bcryptSalt); //gera o salt

  try {
    const hashPass = await bcrypt.hashSync(password, salt); //pega a senha e o salt para embaralhar

    const novoColaborador = new Colaborador({
      nome,
      hashPass,
    });

    novoColaborador
      .save()
      .then((colaborador) => {
        res.status(201).json(colaborador);
      })
      .catch((err) => next(err));
  } catch (e) {
    return res.status(401).json({ error: "erro" });
  }
};
