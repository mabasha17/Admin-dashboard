const express = require("express");
const router = express.Router();
const {
  getUsers,
  promoteUser,
  deleteUser,
  toggleUserStatus,
} = require("../controllers/user.controller");
const {
  authMiddleware,
  requireRole,
} = require("../middleware/auth.middleware");

// All user routes require admin role
router.use(authMiddleware);
router.use(requireRole("admin"));

router.get("/", getUsers);
router.patch("/:id/promote", promoteUser);
router.delete("/:id", deleteUser);
router.patch("/:id/status", toggleUserStatus);

module.exports = router;

