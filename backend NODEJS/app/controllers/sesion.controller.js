const { sesion } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const sesions = await sesion.findAll({
      attributes: ["id", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo", "enlace"],
    });
    res.json(sesions);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los sesiones");
  }
};

exports.getOne = async (req, res) => {
  try {
    const ses = await sesion.findOne({
      where: { semana: req.params.semana, anyo: req.params.anyo, entrenamientoId: req.params.id },
      attributes: ["id", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo", "enlace"],
    });
    if (!ses) {
      //   return res.status(404).send("El sesion especificado no se ha encontrado");
    }

    res.json(ses);
  } catch (error) {
    res.status(500).send("Ha ocurrido un error al obtener el sesion");
  }
};

exports.insertar = async (req, res) => {
  try {
        console.log('INSERTAR');
    const sesio = sesion.create({
      semana: req.body.semana,
      anyo: req.body.anyo,
      lunes: req.body.lunes,
      martes: req.body.martes,
      miercoles: req.body.miercoles,
      jueves: req.body.jueves,
      viernes: req.body.viernes,
      sabado: req.body.sabado,
      domingo: req.body.domingo,
      enlace: req.body.enlace,
      entrenamientoId: req.body.entrenamientoId,
    });

    res.send({ message: "Sesion creada correctamente!" });
  } catch {
    res.status(500).send({ message: "Error al crear la sesion" });
  }
};

exports.update = async (req, res) => {
  try {
    console.log('UPDATE');

    console.log(req.body.enlace);
    const sesio = await sesion.findOne({
      where: { id: req.body.id },
    });

    sesio.update({
      lunes: req.body.lunes,
      martes: req.body.martes,
      miercoles: req.body.miercoles,
      jueves: req.body.jueves,
      viernes: req.body.viernes,
      sabado: req.body.sabado,
      domingo: req.body.domingo,
      enlace: req.body.enlace
    });

    await sesio.save();

    res.send({ message: "Sesion editado correctamente!" });
  } catch {
    return res.status(500).send({ message: "Error al editar sesion!" });
  }
};
