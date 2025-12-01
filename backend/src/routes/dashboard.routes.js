const express = require("express");
const router = express.Router();
const { getDashboardOverview } = require("../controllers/dashboard.controller");
const {
  authMiddleware,
  requireRole,
} = require("../middleware/auth.middleware");

router.get(
  "/overview",
  authMiddleware,
  requireRole("admin"),
  getDashboardOverview
);

module.exports = router;
