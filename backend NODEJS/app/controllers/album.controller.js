const { album } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const albums = await album.findAll();
    res.json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los albums");
  }
};

exports.getOne = async (req, res) => {
  try {
    const alb = await album.findOne({
      where: { id: req.params.id },
    });
    if (!alb) {
      return res.status(404).send("El album no se ha encontrado");
    }
    res.json(alb);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener el album");
  }
};

exports.getByClub = async (req, res) => {
  try {
    const albums = await album.findAll({
      where: { clubId: req.params.id },
    });

    if (!albums) {
      return res.status(404).send("No hay albums del club!");
    }

    res.json(albums);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los albums");
  }
};

exports.insertar = async (req, res) => {
  try {
    const alb = album.create({
      description: req.body.description,
      enlace: req.body.enlace,
      clubId: req.body.clubId,
      temporadaId: req.body.temporadaId,
    });

    res.send({ message: "Album creado correctamente!" });
  } catch {
    res.status(500).send({ message: "Error al crear el album" });
  }
};

exports.update = async (req, res) => {
  try {
    const alb = await album.findOne({ where: { id: req.body.id } });

    alb.update({ description: req.body.description, enlace: req.body.enlace, clubId: req.body.clubId, temporadaId: req.body.temporadaId });

    await alb.save();

    res.send({ message: "Album editado correctamente!" });
  } catch {
    return res.status(500).send({ message: "Error al editar album!" });
  }
};

exports.delete = async (req, res) => {
  try {
    const alb = await album.findOne({
      where: { id: req.params.id },
    });

    await alb.destroy();

    res.send({ message: "Album eliminado correctamente!" });
  } catch {
    return res.status(500).send({ message: "Error al eliminar album!" });
  }
};
