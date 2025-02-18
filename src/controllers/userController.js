// import thư viện mã hóa password
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const userValidation = require('../validator/users/userValidator');
// 🔹 Lấy danh sách user
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // Trang hiện tại
    const limit = parseInt(req.query.limit) || 10; // Số sản phẩm mỗi trang
    const search = req.query.search || ""; // Từ khóa tìm kiếm

    // Điều kiện tìm kiếm theo tên sản phẩm (không phân biệt hoa thường)
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const options = {
      page,
      limit,
      sort: { createdAt: -1 }, // Sắp xếp mới nhất trước
    };

    const products = await User.paginate(query, options);

    res.json({
      status: "success",
      message: "Lấy danh sách user thành công",
      data: {
        products: products.docs,
        pagination: {
          totalItems: products.totalDocs,
          totalPages: products.totalPages,
          currentPage: products.page,
          hasNextPage: products.hasNextPage,
          hasPrevPage: products.hasPrevPage,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Lỗi server",
      error: err.message,
    });
  }
};

// 🔹 Lấy user theo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// 🔹 Thêm user mới
exports.createUser = async (req, res) => {
  try {
    // Validate dữ liệu đầu vào
    const { error } = userValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // mã hóa pass
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User được tạo", newUser });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Không thể tạo user", error });
  }
};

// 🔹 Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json({ message: "Cập nhật thành công", updatedUser });
  } catch (error) {
    res.status(400).json({ message: "Lỗi cập nhật", error });
  }
};

// 🔹 Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json({ message: "Xóa user thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
