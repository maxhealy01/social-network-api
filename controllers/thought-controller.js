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
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "No user found with this id!" });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},
	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.select("-__v")
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json(err);
			});
	},
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, {
			new: true,
			runValidators: true,
		})
			.then((dbThoughtData) => {
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.status(400).json(err));
	},
	addReaction(req, res) {
		console.log(req.params.thoughtId, req.body);
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ new: true, runValidators: true }
		)
			.then((dbThoughtData) => {
				console.log(dbThoughtData);
				if (!dbThoughtData) {
					res.status(404).json({ message: "No thought found with this id!" });
					return;
				}
				res.json(dbThoughtData);
			})
			.catch((err) => res.json(err));
	},
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbThoughtData) => res.json(dbThoughtData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
