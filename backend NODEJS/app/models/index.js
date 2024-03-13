const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.url, {
  dialect: config.dialect,
  dialegOptions: config.dialectOptions
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sesion = require("../models/sesion.model.js")(sequelize, Sequelize);
db.temporada = require("../models/temporada.model.js")(sequelize, Sequelize);
db.album = require("../models/album.model.js")(sequelize, Sequelize);
db.notificacion = require("../models/notificacion.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.categoria = require("../models/categoria.model.js")(sequelize, Sequelize);
db.club = require("../models/club.model.js")(sequelize, Sequelize);
db.entrenamiento = require("../models/entrenamiento.model.js")(sequelize, Sequelize);

// Relacion entre tablas
db.role.hasMany(db.user, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.categoria.hasMany(db.user, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.club.hasMany(db.user, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.temporada.hasMany(db.album, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.temporada.hasMany(db.entrenamiento, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.club.hasMany(db.album, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.club.hasMany(db.entrenamiento, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.entrenamiento.hasMany(db.user);

db.entrenamiento.hasMany(db.sesion, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.club.hasMany(db.notificacion, { onDelete: "CASCADE", onUpdate: "CASCADE" });

// setTimeout(() => {
//   db.sesion.queryInterface.addConstraint("sesiones", {
//     type: "unique",
//     fields: ["semana", "anyo", "entrenamientoId"],
//   });

//   db.sesion.create({
//     semana: 18,
//     anyo: 2023,
//     sabado: 'HOLA ESTA ES LA SESION DEL 6 DE MAYO',
//     entrenamientoId: 1
//   })
// }, 5000);

db.ROLES = ["Usuario", "Admin", "Contenido", "Entrenador"];
db.CATEGORIAS = [
  "Pre-benjamin",
  "Benjamin",
  "Alevin",
  "Infantil",
  "Cadete",
  "Junior",
  "Sub23",
  "Senior",
  "Vet-A",
  "Vet-B",
  "Vet-C",
  "Vet-D",
  "Vet-E",
  "Vet-F",
];

module.exports = db;
