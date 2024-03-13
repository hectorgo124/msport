const { authJwt } = require("../middleware");
const controller = require("../controllers/club.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/clubs/all",  [authJwt.verifyToken], controller.getAll);

  app.get("/api/clubs/:id", [authJwt.verifyToken], controller.getOne);

};
