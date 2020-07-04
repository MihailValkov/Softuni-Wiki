const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { String, ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdArticles: [{ type: ObjectId, ref: "Articles" }],
});

userSchema.methods = {
  checkPasswords: function (password) {
    return bcrypt.compare(password, this.password);
  },
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
      return;
    } catch (error) {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
