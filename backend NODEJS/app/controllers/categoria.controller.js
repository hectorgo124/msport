const { categoria } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const categorias = await categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los categorias");
  }
};

exports.getOne = async (req, res) => {
  try {
    const cat = await categoria.findOne({
      where: { id: req.params.id },
    });
    if (!cat) {
      return res.status(404).send("La categoria no se ha encontrado");
    }
    res.json(cat);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener la categoria");
  }
};
