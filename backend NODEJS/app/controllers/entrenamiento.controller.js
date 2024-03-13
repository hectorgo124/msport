const { entrenamiento } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const entrenes = await entrenamiento.findAll();
    res.json(entrenes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los entrenamientos.");
  }
};

exports.getAllByClub = async (req, res) => {
  try {
    const entrenes = await entrenamiento.findAll({
      where: { clubId: req.params.id },
    });
    res.json(entrenes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los entrenamientos.");
  }
};

exports.getOne = async (req, res) => {
  try {
    const entrene = await entrenamiento.findOne({
      where: { id: req.params.id },
    });
    if (!entrene) {
      return res.status(404).send("El entrenamiento no se ha encontrado");
    }
    res.json(entrene);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener el entrenamiento");
  }
};

exports.getByTemporada = async (req, res) => {
  try {
    const entrene = await entrenamiento.findAll({
      where: { clubId: req.params.id },
    });

    if (!entrene) {
      return res.status(404).send("No hay entrenamientos del club!");
    }

    res.json(entrene);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error al obtener los entrenamientos");
  }
};

exports.insertar = async (req, res) => {
  try {
    const entrene = entrenamiento.create({
      nombre: req.body.nombre,
      clubId: req.body.clubId,
      temporadaId: req.body.temporadaId,
    });

    res.send({ message: "Entrenamiento creado correctamente!" });
  } catch {
    res.status(500).send({ message: "Error al crear entrenamiento" });
  }
};

exports.update = async (req, res) => {
  try {
    const entrene = await entrenamiento.findOne({ where: { id: req.body.id } });

    entrene.update({ nombre: req.body.nombre, temporadaId: req.body.temporadaId });

    await entrene.save();

    res.send({ message: "Entrenamiento editado correctamente!" });
  } catch {
    return res.status(500).send({ message: "Error al editar entrenamiento!" });
  }
};

exports.delete = async (req, res) => {
  try {
    console.log('delete' + req.params.id);
    const entrene = await entrenamiento.findOne({
      where: { id: req.params.id },
    });

    await entrene.destroy();

    res.send({ message: "Entrenamiento eliminado correctamente!" });
  } catch {
    return res.status(500).send({ message: "Error al eliminar entrenamiento!" });
  }
};

exports.agregarTipo = async (req, res) => {
  try {
    const entrene = await entrenamiento.findOne({ where: { id: req.body.id } });

    entrene.update({ tipo: req.body.tipo });

    await entrene.save();

    res.send({ message: "Entrenamiento editado correctamente!" });
  } catch (error) {
    return res.status(500).send({ message: "Error al editar entrenamiento!" });
  }
};
