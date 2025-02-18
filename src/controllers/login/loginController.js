// import thư vien mã hóa pass để so sánh
const bcrypt = require("bcryptjs");
// import thu vin sinh ra token dang nhap
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const loginValidation = require('../../validator/login/loginValidator');
exports.login = async (req, res) => {
    try {
        // Validate dữ liệu đầu vào
        const { error } = loginValidation.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { email, password } = req.body;

        // Kiểm tra người dùng có tồn tại không
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid email" });

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid  password" });

        // Tạo JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
