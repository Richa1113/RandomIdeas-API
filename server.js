const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

//add a body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the RandomIdeas app" });
});

const IdeasRoutes = require("./routes/ideas");
app.use("/api/ideas", IdeasRoutes);

app.listen(port, () => console.log(`server listening on port ${port}`));
