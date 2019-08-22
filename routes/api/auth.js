import { Router } from "express";
const router = Router();
import { url } from "gravatar";
import { genSalt, hash as _hash } from "bcrypt";

// Load user model
import User from "../../models/User";

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
router.get("/test", (req, res) =>
	res.json({
		msg: "Auth Works"
	})
);

// @route   GET api/auth/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const avatar = url(req.body.email, {
				s: "200", // Size
				r: "pg", // Rating
				d: "mm" // Default
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			genSalt(10, (err, salt) => {
				_hash(newUser.password, salt, (err, hash) => {
					if (err) {
						throw err;
					}

					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

export default router;
