const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");

const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // AGAFAR ELS USUARIS DE UN CLUB
  app.get("/api/users/:id", [authJwt.verifyToken], controller.getAllUsers);

  // AGAFAR EL USUARI PER LA ID
  app.get("/api/user/:id", [authJwt.verifyToken], controller.getUser);

  // UPDATE DE UN USER
  app.post("/api/user/update", [authJwt.verifyToken], controller.updateUser);

  // DELETE DE UN USER
  app.delete("/api/user/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);

  // agregar entrene
  app.post("/api/user/entrene", [authJwt.verifyToken, authJwt.isEntrenador], controller.agregarEntrene);

  // buscar por entrene
  app.get("/api/users/entrene/:clubId/:id", [authJwt.verifyToken, authJwt.isEntrenador], controller.getByEntrene);

  app.get("/api/entrenador", [authJwt.verifyToken, authJwt.isEntrenador], controller.entrenadorBoard);

  app.get("/api/contenido", [authJwt.verifyToken, authJwt.isContenido], controller.contenidoBoard);

  app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};
