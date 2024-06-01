const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  database: "e_pengaduan",
  user: "root",
  password: "",
});

module.exports = pool;
