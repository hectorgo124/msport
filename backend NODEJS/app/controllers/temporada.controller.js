const { temporada } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const temporadas = await temporada.findAll();
    res.json(temporadas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los categorias");
  }
};

exports.getOne = async (req, res) => {
  try {
    const temp = await temporada.findOne({
      where: { id: req.params.id },
    });
    if (!temp) {
      return res.status(404).send("La temporada no se ha encontrado");
    }
    res.json(temp);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener la temporada");
  }
};
