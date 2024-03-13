const { authJwt } = require("../middleware");
const controller = require("../controllers/album.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/albums/all", controller.getAll);

  app.get("/api/albums/:id", [authJwt.verifyToken], controller.getOne);

  app.get("/api/albums/club/:id", [authJwt.verifyToken], controller.getByClub);

  app.post("/api/albums/new", [authJwt.verifyToken, authJwt.isContenido], controller.insertar);

  app.post("/api/albums/update", [authJwt.verifyToken, authJwt.isContenido], controller.update);

  app.delete("/api/albums/delete/:id", [authJwt.verifyToken, authJwt.isContenido], controller.delete);


};
