import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
  },
  fullname: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (message) => "Invalid Email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  listings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],

  refreshTokens: [
    {
      type: String,
    },
  ],
});

userSchema.methods.comparePasswords = async function (loginPassword) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(loginPassword, user.password);

  return isPasswordValid;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    const hashedPassword = await bcrypt.hash(user.password, 8);

    user.password = hashedPassword;
    return next();
  }

  return next();
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.fullname) {
    user.fullname = user.firstname + " " + user.lastname;
  }
  return next();
});

userSchema.post("save", (error, _doc, next) => {
  if (error.code === 11000) {
    return next({ message: "Email Already Exists" });
  }

  return next();
});

userSchema.set("toJSON", {
  transform: function (_doc, ret, _opt) {
    delete ret.password;
    delete ret.__v;

    return ret;
  },
});

export const User = mongoose.model("User", userSchema);
