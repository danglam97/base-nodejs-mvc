# Node.js MVC Project

Dự án này là một ứng dụng Node.js sử dụng mô hình MVC (Model-View-Controller) và kết nối với cơ sở dữ liệu MySQL. Hướng dẫn dưới đây sẽ giúp bạn cài đặt và triển khai dự án.

## các thư viện đã cài

- cors
- MySQL
- body-parser
- dotenv 
- ejs
- express
- method-override
- nodemon
- mongoose
- joi
- jsonwebtoken
- bcryptjs

## Cài đặt dự án
- git clone <url_repository>
- cd <project_directory>
- npm i
- thay đổi cấu hính file .env nếu chưa có .env thì tạo 1 file .env rồi thay đổi cấu hình theo máy của mình
## các ấu hình env
- PORT=3000
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=your_password
- DB_NAME=your_database_name
- DB_PORT = 3306
- MONGO_URI = mongodb://localhost:27017/(your_database_name)
- JWT_SECRET=supersecretkey
