const User = require("../models/user.model");
const Metric = require("../models/metric.model");

// GET /api/dashboard/overview
// Protected, admin-only (via routes)
const getDashboardOverview = async (req, res, next) => {
  try {
    // Cards
    const totalUsers = await User.countDocuments();
    const totalSalesDocs = await Metric.countDocuments({ type: "sales" });
    const revenueAgg = await Metric.aggregate([
      { $match: { type: "sales" } },
      { $group: { _id: null, totalRevenue: { $sum: "$value" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    // Very simple "active sessions": sessions from last 15 minutes
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const activeSessions = await Metric.countDocuments({
      type: "session",
      date: { $gte: fifteenMinutesAgo },
    });

    // Line chart: user signups over last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const signupsAgg = await Metric.aggregate([
      { $match: { type: "signup", date: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const signupLabels = signupsAgg.map((item) => item._id);
    const signupData = signupsAgg.map((item) => item.count);

    // Doughnut chart: sales by category
    const salesByCategoryAgg = await Metric.aggregate([
      { $match: { type: "sales" } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$value" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const categoryLabels = salesByCategoryAgg.map(
      (item) => item._id || "Uncategorized"
    );
    const categoryData = salesByCategoryAgg.map((item) => item.total);

    res.json({
      overview: {
        totalUsers,
        activeSessions,
        totalSales: totalSalesDocs,
        totalRevenue,
      },
      charts: {
        signupsOverTime: {
          labels: signupLabels,
          data: signupData,
        },
        salesByCategory: {
          labels: categoryLabels,
          data: categoryData,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboardOverview };
