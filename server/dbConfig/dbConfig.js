const mySql = require("mysql");
const conn = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "travel",
});
conn.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Database is connected");
  }
});

module.exports = conn;
