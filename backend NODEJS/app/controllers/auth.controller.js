const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    if (req.body.role) {
      const user = await User.create({
        username: req.body.username,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        sexo: req.body.sexo,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: req.body.role,
        categoriaId: req.body.categoria,
        clubId: req.body.clubId,
      });
    } else {
      const role = await Role.findOne({ where: { name: "user" } });
      const user = await User.create({
        username: req.body.username,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        sexo: req.body.sexo,
        password: bcrypt.hashSync(req.body.password, 8),
        roleId: role.id,
        categoriaId: req.body.categoria,
        clubId: req.body.clubId,
      });
    }

    res.send({ message: "Usuario registrado correctamente!" });
   
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Contraseña incorrecta!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret);

    res.cookie.authToken = token;

    const role = await Role.findByPk(user.roleId);

    const rol = "ROLE_" + role.name.toUpperCase();

    return res.status(200).send({
      id: user.id,
      username: user.username,
      role: rol,
      clubId: user.clubId,
      entrenamientoId: user.entrenamientoId,
      accessToken: token,
    });
  } catch (error) {
    error.message = 'Problema del servidor al iniciar sesion.'
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.cookies = null;
    return res.status(200).send({
      message: "Has cerrado sesión!",
    });
  } catch (err) {
    this.next(err);
  }
};
