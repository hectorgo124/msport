const { authJwt } = require("../middleware");
const controller = require("../controllers/categoria.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/categorias/all", controller.getAll);

  app.get("/api/categorias/:id", [authJwt.verifyToken], controller.getOne);

};
