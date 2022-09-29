const router = require("express").Router();
const { checkJwt, checkJwt2 } = require("./middleware");
const users = require('../controllers/users')

//TODO: GET A USER -> will be used in the search
//get a user
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         //take away what we dont want to see
//         const {password, email, isAdmin, ...other } = user._doc
//         res.status(200).json(other)

//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

router.get("/", users.getUser);

//follow a user (with JWT) TODO: implement in frontend
router.put("/:id/follow", [checkJwt, checkJwt2], users.followUser);

//unfollow a user (with JWT) TODO: implement in frontend
router.put("/:id/unfollow", [checkJwt, checkJwt2], users.unfollowUser);

module.exports = router;
