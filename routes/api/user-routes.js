const router = require("express").Router();

const { getUsers, addUser } = require("../../controllers/user-controller");

router.route("/").get(getUsers).post(addUser);

module.exports = router;
