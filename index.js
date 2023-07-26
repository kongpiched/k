const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config().parsed;
const { executeSQL } = require("./services/callMySQL");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", async (req, res) => {
  let sql = "select * from users";
  let rsl = await executeSQL(sql);
  res.json(rsl);
});

app.post("/api/users", async (req, res) => {
  const newUser = {
    id: req.body.id,
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  res.json(newUser);
  // let sql = "INSERT INTO users VALUES ()";
  // let rsl = await executeSQL(sql);
});

app.listen(process.env.PORT_API, () => {
  console.log(`Server start on port : ${process.env.PORT_API}`);
});
