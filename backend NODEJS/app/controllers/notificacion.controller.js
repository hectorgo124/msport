const { notificacion } = require("../models");

exports.getByClub = async (req, res) => {
  try {
    const { Op } = require("sequelize");

    // ELIMINAR LAS DE FECHAS PASADAS
    const deletedRows = await notificacion.destroy({
      where: {
        fechaFin: { [Op.lt]: new Date(new Date().setHours(-1, 0, 0, 0)) },
      },
    });
    console.log(`Se eliminaron ${deletedRows} registros de notificaciones.`);

    const notificaciones = await notificacion.findAll({
      where: { clubId: req.params.id },
    });
    res.json(notificaciones);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener las notificaciones.");
  }
};

exports.getActuales = async (req, res) => {
  try {
    const { Op } = require("sequelize");

    // ELIMINAR LAS DE FECHAS PASADAS 
    const deletedRows = await notificacion.destroy({
      where: {
        fechaFin: { [Op.lt]: new Date(new Date().setHours(0, 0, 0, 0)) }, // lt = lower than
      },
    });
    console.log(`Se eliminaron ${deletedRows} registros de notificaciones.`);

    const notificaciones = await notificacion.findAll({
      where: { clubId: req.params.id, fechaInicio: { [Op.lt]: new Date(new Date().setHours(24, 0, 0, 0)) } },
    });
    res.json(notificaciones);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener las notificaciones.");
  }
};

exports.getOne = async (req, res) => {
  try {
    const noti = await notificacion.findOne({
      where: { id: req.params.id },
    });
    if (!noti) {
      return res.status(404).send("La notificacion no se ha encontrado");
    }
    res.json(noti);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener la notificacion");
  }
};

exports.insertar = async (req, res) => {
  try {
    const noti = notificacion.create({
      description: req.body.description,
      fechaInicio: req.body.fechaInicio,
      fechaFin: req.body.fechaFin,
      enlace: req.body.enlace,
      clubId: req.body.clubId,
    });

    res.send({ message: "Notificacion creada correctamente!" });
  } catch {
    res.status(500).send({ message: "Error al crear notificacion" });
  }
};

exports.update = async (req, res) => {
  try {
    const noti = await notificacion.findOne({ where: { id: req.body.id } });

    noti.update({ description: req.body.description, fechaInicio: req.body.fechaInicio, fechaFin: req.body.fechaFin, enlace: req.body.enlace });

    await noti.save();

    res.send({ message: "Notificacion editada correctamente!" });
  } catch {
    return res.status(500).send({ message: "Error al editar notificacion!" });
  }
};

exports.delete = async (req, res) => {
  try {
    const noti = await notificacion.findOne({
      where: { id: req.params.id },
    });

    await noti.destroy();

    res.send({ message: "Notificacion eliminada correctamente!" });
  } catch {
    return res.status(500).send({ message: "Error al eliminar notificacion!" });
  }
};
