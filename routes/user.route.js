const userController = require("../controllers/user.controller");

module.exports = (openRouter, secureRouter) => {
  openRouter
    .route("/signup")
    .post(userController.createUser);
  openRouter
    .route("/login")
    .post(userController.loginUser);
  secureRouter
    .route("/getEvents")
    .get(userController.getEvents);
  secureRouter
    .route("/setPreferences")
    .post(userController.setPreferences);
};
