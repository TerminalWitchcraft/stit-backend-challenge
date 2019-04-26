const userController = require("../controllers/user.controller");

module.exports = (openRouter, secureRouter) => {
  openRouter
    .route("/auth")
    .get(userController.loginUser)
    .post(userController.createUser);
};
