const router = require("express").Router();
const {
  userIdValidation,
  profileValidation,
  avatarValidation,
} = require("../middlewares/validation");

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require("../controllers/users");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", userIdValidation, getUser);

router.patch("/me", profileValidation, updateProfile);

router.patch("/me/avatar", avatarValidation, updateAvatar);

module.exports = router;
