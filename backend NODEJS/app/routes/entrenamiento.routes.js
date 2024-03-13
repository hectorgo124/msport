const { authJwt } = require("../middleware");
const controller = require("../controllers/entrenamiento.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/entrenamientos/all", controller.getAll);

  app.get("/api/entrenamientos/club/:id", [authJwt.verifyToken], controller.getAllByClub);

  app.get("/api/entrenamientos/:id", [authJwt.verifyToken], controller.getOne);

  app.get("/api/entrenamientos/temporada/:id", [authJwt.verifyToken], controller.getByTemporada);

  app.post("/api/entrenamientos/new", [authJwt.verifyToken, authJwt.isEntrenador], controller.insertar);

  app.post("/api/entrenamientos/update", [authJwt.verifyToken, authJwt.isEntrenador], controller.update);

  app.delete("/api/entrenamientos/delete/:id", [authJwt.verifyToken, authJwt.isEntrenador], controller.delete);

  app.post("/api/entrenamientos/tipo", [authJwt.verifyToken, authJwt.isEntrenador], controller.agregarTipo);

};
