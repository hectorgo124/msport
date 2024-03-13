const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {

  let token = req.cookies.authToken;

  if (!token) {
    return res.status(403).send({
      message: "No hay token!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "No verificado",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    const role = await Role.findByPk(user.roleId);

    if (role.name === "Admin") return next();

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error al autorizar el rol del usuario!",
    });
  }
};

isContenido = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const role = await Role.findByPk(user.roleId);

    if (role.name === "Contenido") return next();

    return res.status(403).send({
      message: "Require Contenido Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error al autorizar el rol del usuario!",
    });
  }
};

isEntrenador = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const role = await Role.findByPk(user.roleId);

    if (role.name === "Entrenador") return next();

    return res.status(403).send({
      message: "Require Entrenador Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error al autorizar el rol del usuario!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isContenido,
  isEntrenador,
};
module.exports = authJwt;
