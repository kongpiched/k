const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config().parsed;
const { executeSQL } = require("./services/callMySQL");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", async (req, res) => {
  let sql = "SELECT * FROM users";
  let rsl = await executeSQL(sql);
  res.json(rsl);
});

app.post("/api/users", async (req, res) => {
  const { id, username, password, firstname, lastname } = req.body;
  let sql = `INSERT INTO users (id, username, password, firstname, lastname) VALUES (${id}, '${username}', '${password}', '${firstname}', '${lastname}')`;
  let rsl = await executeSQL(sql);
  return res.status(201).json({ message: "New user successfull creatted" });
});

app.put("/api/users/:username", async (req, res) => {
  const username = req.params.username;
  const { password, firstname, lastname } = req.body;
  let sql = `UPDATE users  SET password = '${password}', firstname = '${firstname}', lastname = '${lastname}' WHERE username = '${username}'`;
  let rsl = await executeSQL(sql);
  return res.status(201).json({ message: "Update user successfull" });
});

app.delete("/api/users/:username", async (req, res) => {
  const username = req.params.username;
  let sql = `DELETE FROM users WHERE username = '${username}'`;
  let rsl = await executeSQL(sql);
  return res.status(201).json({ message: "Delete user successfull" });
});

app.listen(process.env.PORT_API, () => {
  console.log(`Server start on port : ${process.env.PORT_API}`);
});
