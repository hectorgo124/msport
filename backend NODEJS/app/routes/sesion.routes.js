const { authJwt } = require("../middleware");
const controller = require("../controllers/sesion.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/sesiones/all", controller.getAll);

  app.get("/api/sesiones/:semana/:anyo/:id", [authJwt.verifyToken], controller.getOne);

  app.post('/api/sesiones/insertar', [authJwt.verifyToken, authJwt.isEntrenador], controller.insertar);

  app.post('/api/sesiones/update', [authJwt.verifyToken, authJwt.isEntrenador], controller.update);


};
