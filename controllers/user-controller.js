const { User, Thought } = require("../models");

const userController = {
	getUsers(req, res) {
		User.find({})
			.select("-__v")
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	addUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.status(400).json(err));
	},
	getUserById({ params }, res) {
		User.findOne({ _id: params.id }).populate({
			path: "thoughts",
			select: "-__v",
		});
	},
};

module.exports = userController;
