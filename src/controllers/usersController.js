const User = require("../models/User");

// Hiển thị danh sách người dùng
exports.getUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).send("Lỗi server");
    res.render("users/index", { users: results });
  });
};

// Hiển thị form thêm
exports.showAddForm = (req, res) => {
  res.render("users/add");
};

// Xử lý thêm người dùng
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  User.create(name, email, (err) => {
    if (err) return res.status(500).send("Lỗi thêm dữ liệu");
    res.redirect("/users/");
  });
};

// Hiển thị form sửa
exports.showEditForm = (req, res) => {
  User.getById(req.params.id, (err, results) => {
    if (err || results.length === 0) return res.status(404).send("Không tìm thấy người dùng");
    res.render("users/edit", { user: results[0] });
  });
};

// Xử lý cập nhật
exports.updateUser = (req, res) => {
  const { name, email } = req.body;
  User.update(req.params.id, name, email, (err) => {
    if (err) return res.status(500).send("Lỗi cập nhật dữ liệu");
    res.redirect("/users/");
  });
};

// Xử lý xóa
exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) return res.status(500).send("Lỗi xóa dữ liệu");
    res.redirect("/users/");
  });
};
