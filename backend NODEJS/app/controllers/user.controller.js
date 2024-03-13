const { user } = require("../models");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      where: {
        clubId: req.params.id,
      },
      order: [["nombre", "ASC"]],
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch {
    res.status(404).send("Error al obtener usuarios del club.");
  }
};

exports.getUser = async (req, res) => {
  try {
    const usuario = await user.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
    });

    res.json(usuario);
  } catch {
    return res.status(404).send("Error al obtener el usuario.");
  }
};

exports.updateUser = async (req, res) => {
  const { Op } = require("sequelize");

  try {
    const usuario = await user.findOne({
      where: { id: req.body.id },
    });

    console.log(usuario);

    let mismoNombre = null;

    if (req.body.username !== usuario.username) {
      // buscar un usuari en el mateix nom pero no la mateixa id
      mismoNombre = await user.findOne({
        where: { id: { [Op.ne]: req.body.id }, username: req.body.username },
      });
      console.log("MATEIX NOM: " + mismoNombre);
    }

    if (mismoNombre !== null) {
      console.log("entra al condicional perque nia mateix nom");
      return res.status(400).send({
        message: "Fallo! Nombre de usuario en uso!",
      });
    } else {
      console.log('entra a fer update');
      usuario.update({
        username: req.body.username,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        sexo: req.body.sexo,
        roleId: req.body.role,
        categoriaId: req.body.categoria,
      });

      await usuario.save();

      if (req.body.password !== null) usuario.update({ password: bcrypt.hashSync(req.body.password, 8) });
      await usuario.save();

      res.send({ message: "Usuario editado correctamente!" });
    }
  } catch {
    return res.status(500).send({ message: "Error al editar usuario!" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const usuario = await user.findOne({
      where: { id: req.params.id },
    });
    res.send({ message: "Usuario eliminado correctamente!" });

    await usuario.destroy();
  } catch {
    return res.status(500).send({ message: "Error al eliminar usuario!" });
  }
};

exports.agregarEntrene = async (req, res) => {
  try {
    const usuario = await user.findOne({
      where: { id: req.body.id },
    });

    console.log(req.body.entrenamientoId);

    if (req.body.entrenamientoId === 0) {
      usuario.update({
        entrenamientoId: null,
      });
    } else {
      usuario.update({
        entrenamientoId: req.body.entrenamientoId,
      });
    }

    await usuario.save();

    res.send({ message: "Usuario editado correctamente!" });
  } catch (error) {
    return res.status(500).send({ message: "Error al editar usuario!" });
  }
};

exports.getByEntrene = async (req, res) => {
  try {
    if (req.params.id === "0") {
      const users = await user.findAll({
        where: {
          entrenamientoId: null,
          clubId: req.params.clubId
        },
        order: [["nombre", "ASC"]],
        attributes: { exclude: ["password"] },
      });
      res.json(users);
    } else {
      const users = await user.findAll({
        where: {
          entrenamientoId: req.params.id,
          clubId: req.params.clubId
        },
        order: [["nombre", "ASC"]],
        attributes: { exclude: ["password"] },
      });
      res.json(users);
    }
  } catch {
    res.status(404).send("Error al obtener usuarios.");
  }
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.entrenadorBoard = (req, res) => {
  res.status(200).send("Entrenador Content.");
};

exports.contenidoBoard = (req, res) => {
  res.status(200).send("Contenido Content.");
};
