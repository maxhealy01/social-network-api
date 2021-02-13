const { User, Thought } = require("../models");

const thoughtController = {
	getAllThoughts(req, res) {
		Thought.find({})
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	addThought({ params, body }, res) {
		Thought.create(body).then(({ _id }) => {
			return User.findOneAndUpdate({ _id: params.thoughtId });
		});
	},
};

module.exports = thoughtController;
