const { club } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const clubs = await club.findAll();
    res.json(clubs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los clubs");
  }
};

exports.getOne = async (req, res) => {
  try {
    console.log(req.params);
    const c = await club.findOne({
      where: { id: req.params.id },
    });
    if (!c) {
      return res.status(404).send("El club especificado no se ha encontrado");
    }
    res.json(c);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener el club");
  }
};
