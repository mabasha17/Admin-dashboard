require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/user.model");
const Metric = require("../models/metric.model");

const seed = async () => {
  try {
    await connectDB();

    console.log("Clearing collections...");
    await User.deleteMany({});
    await Metric.deleteMany({});

    console.log("Seeding users...");

    // ✅ Plain passwords; pre-save hook will hash them
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "Admin@123",
      role: "admin",
      status: "active",
    });

    // Generate 50 users with realistic names
    const firstNames = [
      "John",
      "Jane",
      "Alice",
      "Bob",
      "Charlie",
      "Diana",
      "Eve",
      "Frank",
      "Grace",
      "Henry",
      "Ivy",
      "Jack",
      "Kate",
      "Liam",
      "Mia",
      "Noah",
      "Olivia",
      "Paul",
      "Quinn",
      "Rachel",
      "Sam",
      "Tina",
      "Uma",
      "Victor",
      "Wendy",
      "Xander",
      "Yara",
      "Zoe",
      "Alex",
      "Blake",
      "Casey",
      "Drew",
      "Ellis",
      "Finley",
      "Gray",
      "Harper",
      "Indigo",
      "Jordan",
      "Kai",
      "Logan",
      "Morgan",
      "Nico",
      "Ocean",
      "Parker",
      "Quinn",
      "River",
      "Sage",
      "Taylor",
      "Val",
      "Winter",
    ];

    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
      "Hernandez",
      "Lopez",
      "Wilson",
      "Anderson",
      "Thomas",
      "Taylor",
      "Moore",
      "Jackson",
      "Martin",
      "Lee",
      "Thompson",
      "White",
      "Harris",
      "Sanchez",
      "Clark",
      "Ramirez",
      "Lewis",
      "Robinson",
      "Walker",
      "Young",
      "Allen",
      "King",
      "Wright",
      "Scott",
      "Torres",
      "Nguyen",
      "Hill",
      "Flores",
      "Green",
      "Adams",
      "Nelson",
      "Baker",
      "Hall",
      "Rivera",
      "Campbell",
      "Mitchell",
      "Carter",
      "Roberts",
    ];

    const usersToInsert = [];

    // Create 50 users
    for (let i = 0; i < 50; i++) {
      const firstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;

      usersToInsert.push({
        name: `${firstName} ${lastName}`,
        email: email,
        password: "User@123",
        role: Math.random() > 0.9 ? "admin" : "user", // 10% chance of admin
        status: Math.random() > 0.15 ? "active" : "inactive", // 85% active
      });
    }

    const normalUsers = await User.insertMany(usersToInsert);

    console.log("Users seeded:", [adminUser, ...normalUsers].length);

    console.log("Seeding metrics...");

    const categories = [
      "Electronics",
      "Fashion",
      "Groceries",
      "Books",
      "Home & Garden",
      "Sports",
      "Toys",
      "Health",
    ];
    const now = new Date();

    const metrics = [];

    // Generate 12 months of data (365 days)
    for (let i = 0; i < 365; i++) {
      const day = new Date(now);
      day.setDate(now.getDate() - i);

      // Set time to random hour during business hours (9 AM - 6 PM)
      const hour = Math.floor(Math.random() * 9) + 9;
      day.setHours(
        hour,
        Math.floor(Math.random() * 60),
        Math.floor(Math.random() * 60)
      );

      // User signups - trending upward over time (more recent = more signups)
      const trendFactor = 1 + ((365 - i) / 365) * 0.5; // 1.0 to 1.5 multiplier
      const baseSignups = Math.floor(Math.random() * 8) + 2; // 2-9 base
      const signupsToday = Math.floor(baseSignups * trendFactor);

      for (let j = 0; j < signupsToday; j++) {
        const signupTime = new Date(day);
        signupTime.setMinutes(signupTime.getMinutes() + j * 5);
        metrics.push({
          type: "signup",
          date: signupTime,
          value: 1,
        });
      }

      // Sales - more on weekends, trending upward
      const isWeekend = day.getDay() === 0 || day.getDay() === 6;
      const weekendMultiplier = isWeekend ? 1.5 : 1.0;
      const baseSales = Math.floor(Math.random() * 15) + 5; // 5-19 base
      const salesToday = Math.floor(
        baseSales * trendFactor * weekendMultiplier
      );

      for (let k = 0; k < salesToday; k++) {
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        // Higher value items in Electronics and Fashion
        const baseAmount =
          category === "Electronics" || category === "Fashion"
            ? Math.floor(Math.random() * 8000) + 2000 // 2000-10000
            : Math.floor(Math.random() * 3000) + 500; // 500-3500
        const amount = Math.floor(baseAmount * trendFactor);

        const saleTime = new Date(day);
        saleTime.setMinutes(saleTime.getMinutes() + k * 3);

        metrics.push({
          type: "sales",
          date: saleTime,
          value: amount,
          category,
        });
      }

      // Active sessions - peak during business hours, lower at night
      const hourMultiplier = hour >= 9 && hour <= 17 ? 1.5 : 0.7;
      const baseSessions = Math.floor(Math.random() * 20) + 10; // 10-29 base
      const sessionsToday = Math.floor(
        baseSessions * trendFactor * hourMultiplier
      );

      for (let s = 0; s < sessionsToday; s++) {
        const sessionTime = new Date(day);
        sessionTime.setMinutes(sessionTime.getMinutes() + s * 2);
        metrics.push({
          type: "session",
          date: sessionTime,
          value: 1,
        });
      }
    }

    await Metric.insertMany(metrics);

    console.log(`Metrics seeded: ${metrics.length} records`);
    console.log(
      `  - Signups: ${metrics.filter((m) => m.type === "signup").length}`
    );
    console.log(
      `  - Sales: ${metrics.filter((m) => m.type === "sales").length}`
    );
    console.log(
      `  - Sessions: ${metrics.filter((m) => m.type === "session").length}`
    );
    console.log("Seed completed successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
