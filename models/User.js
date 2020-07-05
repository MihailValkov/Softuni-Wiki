const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { String, ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator : (x)=> {
        return /^[A-Za-z0-9-_]+$/.test(x)
      },
      message : () => 'Username should contain only English characters , numbers , "_" or "-" !'
    }
  },
  password: {
    type: String,
    required: true,
    minlength : [6 , "Password should be at least 6 characters long !"]
  },
  createdArticles: [{ type: ObjectId, ref: "Article" }],
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
