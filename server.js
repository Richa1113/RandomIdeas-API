const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

//static folder
app.use(express.static(path.join(__dirname, "public")));

//add a body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//add a cors middleware
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials : true
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the RandomIdeas app" });
});

const IdeasRoutes = require("./routes/ideas");
app.use("/api/ideas", IdeasRoutes);

app.listen(port, () => console.log(`server listening on port ${port}`));
