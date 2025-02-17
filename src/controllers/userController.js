const User = require("../models/userModel");

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
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json({ message: "User được tạo", newUser });
  } catch (error) {
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
