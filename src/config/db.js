const mysql = require("mysql");
// đọc ra các biến khái file config .env
require("dotenv").config();

// Tạo kết nối MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT
});

// Kiểm tra kết nối
db.connect((err) => {
  if (err) {
    console.error("❌ Không thể kết nối MySQL:", err);
    return;
  }
  console.log("✅ MySQL connected...");
});

module.exports = db;