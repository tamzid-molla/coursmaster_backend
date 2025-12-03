const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [18, "Password cannot exceed 18 characters"],
    },
    role: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student"
    },
    enrolledCourses: [
        {
            courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            },
            progress: {
                type: Number,
                default:0
            },
             completedLessons: [
          {
            lessonId: String,
          },
        ],
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
        batch: String,
      },
    ],
     assignments: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        moduleId: String,
        answer: String,
        submittedAt: { type: Date, default: Date.now },
      },
    ],

    quizzes: [
      {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        moduleId: String,
        score: Number,
        submittedAt: { type: Date, default: Date.now },
      },
    ],
    isVerifiedAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.methods.GenerateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

module.exports = mongoose.model("user", userSchema);
