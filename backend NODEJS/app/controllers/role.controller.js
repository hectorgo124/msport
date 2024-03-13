const { role } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const roles = await role.findAll();
    res.json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los roles");
  }
};

exports.getOne = async (req, res) => {
  try {
    const role = await role.findOne({
      where: { id: req.params.id },
    });
    if (!role) {
      return res.status(404).send("El rol especificado no se ha encontrado");
    }
    res.json(role);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener el rol");
  }
};
