// khởi tạo biến môi trường
require("dotenv").config();

const express = require("express");

const path = require("path");

const cors = require("cors");

const methodOverride = require("method-override");

const bodyParser = require("body-parser");

// Kết nối đến db
const connectDB = require("./config/mongoDB");
 connectDB()

// require('./config/db')
const app = express();
app.use(cors());
app.use(express.json());

// bodyParser đọc và xử lý dữ liệu gửi từ các form HTML

app.use(bodyParser.urlencoded({ extended: true }));

// Mặc dù HTML form chỉ hỗ trợ GET và POST, chúng ta có thể gửi _method=PUT hoặc _method=DELETE 
// và methodOverride sẽ chuyển thành PUT hoặc DELETE thực sự
app.use(methodOverride("_method"));

// Cấu hình để Express sử dụng EJS làm template engine cho các view (file .ejs)
app.set("view engine", "ejs");

// Cấu hình thư mục chứa các view (đây là nơi Express sẽ tìm các file EJS)
// Tạo ra đường dẫn đến thư mục views, nơi chứa các file giao diện
app.set("views", path.join(__dirname, "views"));


// import Routes
const userRoutes = require('./routes/userRoutes')
app.use("/users", userRoutes);






module.exports = app;