const { authJwt } = require("../middleware");
const controller = require("../controllers/notificacion.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/notificaciones/club/:id", [authJwt.verifyToken], controller.getByClub);
  
  app.get("/api/notificaciones/club/actuales/:id", [authJwt.verifyToken], controller.getActuales);

  app.get("/api/notificaciones/:id", [authJwt.verifyToken], controller.getOne);

  app.post("/api/notificaciones/new", [authJwt.verifyToken, authJwt.isAdmin], controller.insertar);

  app.post("/api/notificaciones/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);

  app.delete("/api/notificaciones/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);

};
