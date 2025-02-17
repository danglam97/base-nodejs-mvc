const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });
// Kích hoạt phân trang cho model
userSchema.plugin(mongoosePaginate);
const User = mongoose.model("Users", userSchema);

module.exports = User;
