const { authJwt } = require("../middleware");
const controller = require("../controllers/temporada.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/temporadas/all", controller.getAll);

  app.get("/api/temporadas/:id", [authJwt.verifyToken], controller.getOne);

};
