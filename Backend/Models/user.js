const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: 3,
    },
    prenom: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: 3,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: 3,
    },
    password: {
      type: String,
      required: true,
      max: 1000,
      minlength: 6,
    },
    secteur: {
      type: String,
      minlength: 3,
      maxlength: 55,
      trim: 3,
    },
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
