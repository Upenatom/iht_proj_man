const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    authLevel: {
      type: String,
      required: true,
      enum: ["superadmin", "admin", "user"],
    },
    statusLevel: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
    },
    department: {
      type: String,
      required: true,
      enum: [
        "R&D",
        "Office",
        "Marketing / Promo",
        "Technical Support, Product Support, QC, ETL",
        "Warehouse & Packaging",
        "Inventory & Purchasing",
        "Building Maintenance",
        "Safety",
        "HR",
      ],
    },
    userName: {
      type: String,
      unique: true,
      trim: true, //removes white spaces from start or end
      required: true,
    },
    userPass: {
      type: String,
      unique: true,
      trim: true, //removes white spaces from start or end
      minLength: 8,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    }, //anytime we call JSON stringify we don't want users password (from mongoose docs)
  }
);
module.exports = mongoose.model("User", userSchema);
