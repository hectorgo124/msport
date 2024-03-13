const { authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/roles/all", controller.getAll);

  app.get("/api/roles/:id", [authJwt.verifyToken], controller.getOne);

};
