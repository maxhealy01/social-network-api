const router = require("express").Router();
const {
	getAllThoughts,
	addThought,
	getThoughtById,
	deleteThought,
	updateThought,
	addReaction,
	deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(addThought);

router
	.route("/:id")
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteThought);

router.route("/:id/reactions").put(addReaction);

router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
