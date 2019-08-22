import { Router } from "express";
const router = Router();

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get("/test", (req, res) =>
	res.json({
		msg: "Posts Works"
	})
);

export default router;
