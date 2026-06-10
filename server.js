const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const projectRoutes = require("./routes/projects");
const contactRoutes = require("./routes/contact");
const connectDB = require("./utils/connectDB");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

if (require.main === module) {
  connectDB()
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
    })
    .finally(() => {
      app.listen(PORT, () => {
        console.log(`Portfolio running at http://localhost:${PORT}`);
      });
    });
}

module.exports = app;
