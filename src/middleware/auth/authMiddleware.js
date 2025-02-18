const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ error: "Access denied" });

    try {
        const bearerToken = token.split(' ')[1];

        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.log("Error: ", error); // In ra lỗi nếu có
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyToken;
