const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();
const cron = require("node-cron");
require("dotenv").config();

app.use(cookieParser());

app.use(
  cors({
    // origin: "http://localhost:4200",
    // credentials: true,
    origin: process.env.REMOTE_CLIENT_APP,
    credentials: true,
  })
);

const db = require("./app/models");
const Role = db.role;
const Categoria = db.categoria;
const User = db.user;
const Club = db.club;
const Temporada = db.temporada;
const Album = db.album;
const Entrenamiento = db.entrenamiento;
const Notificacion = db.notificacion;

const bcrypt = require("bcryptjs");

// si volem reiniciar la base de datos posem force:true y descomentar la funcio initial
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

const config = require("./app/config/auth.config");

app.use(
  cookieSession({
    name: "msport-session",
    keys: [config.secret], // llaves secretas para firmar las cookies
    maxAge: 24 * 60 * 60 * 1000, // tiempo de expiración de la cookie (1 dia)
    secret: "COOKIE_SECRET", // sera utilizado como key si no tiene key, en este caso si que tengo
    httpOnly: true,
  })
);

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/categoria.routes")(app);
require("./app/routes/club.routes")(app);
require("./app/routes/temporada.routes")(app);
require("./app/routes/album.routes")(app);
require("./app/routes/entrenamiento.routes")(app);
require("./app/routes/sesion.routes")(app);
require("./app/routes/notificacion.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1212;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

cron.schedule("0 0 0 * * *", async () => {
  try {
    const deletedRows = await Notificacion.destroy({
      where: {
        fechaFin: { [db.Sequelize.Op.lt]: new Date() },
      },
    });
    console.log(`Se eliminaron ${deletedRows} registros de notificaciones.`);
  } catch (error) {
    console.error(
      "Ocurrió un error al eliminar registros de notificaciones:",
      error
    );
  }
});

function initial() {
  Temporada.create({ description: "2022-2023" });
  Temporada.create({ description: "2021-2022" });

  Role.create({
    id: 1,
    name: "Admin",
  });

  Role.create({
    id: 2,

    name: "Usuario",
  });

  Role.create({
    id: 3,
    name: "Contenido",
  });

  Role.create({
    id: 4,
    name: "Entrenador",
  });

  Categoria.create({
    name: "Pre-benjamin",
  });

  Categoria.create({
    name: "Benjamin",
  });

  Categoria.create({
    name: "Alevin",
  });
  Categoria.create({
    name: "Infantil",
  });
  Categoria.create({
    name: "Cadete",
  });
  Categoria.create({
    name: "Junior",
  });
  Categoria.create({
    name: "Sub23",
  });
  Categoria.create({
    name: "Senior",
  });
  Categoria.create({
    name: "Vet-A",
  });
  Categoria.create({
    name: "Vet-B",
  });
  Categoria.create({
    name: "Vet-C",
  });
  Categoria.create({
    name: "Vet-D",
  });
  Categoria.create({
    name: "Vet-E",
  });
  Categoria.create({
    name: "Vet-F",
  });

  Club.create({
    nombre: "Club IES Sant Vicent",
  });

  User.create({
    username: "admin",
    nombre: "Administrador",
    apellidos: "Proba",
    sexo: "Hombre",
    password: bcrypt.hashSync("adminprobes", 8),
    roleId: 1,
    categoriaId: 8,
    clubId: 1,
  });

  User.create({
    username: "contingut",
    nombre: "Contingut",
    apellidos: "Probes",
    sexo: "Hombre",
    password: bcrypt.hashSync("contingutprobes", 8),
    roleId: 3,
    categoriaId: 8,
    clubId: 1,
  });

  User.create({
    username: "entrene",
    nombre: "Entrene",
    apellidos: "Probes",
    sexo: "Hombre",
    password: bcrypt.hashSync("entreneprobes", 8),
    roleId: 4,
    categoriaId: 8,
    clubId: 1,
  });

  User.create({
    username: "usuari",
    nombre: "Usuari",
    apellidos: "Probes",
    sexo: "Mujer",
    password: bcrypt.hashSync("usuariprobes", 8),
    roleId: 2,
    categoriaId: 8,
    clubId: 1,
  });

  Entrenamiento.create({
    nombre: "Cadetes Infantiles",
    temporadaId: 1,
    clubId: 1,
  });

  Entrenamiento.create({
    nombre: "Juvenils",
    temporadaId: 1,
    clubId: 2,
  });
}
