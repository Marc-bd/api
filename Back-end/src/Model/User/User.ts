import mongoose from "mongoose";
import validator from "validator";
import mongooseHidden from "mongoose-hidden";
const Schema = mongoose.Schema;

//Create Schema
const User = new Schema({
	username: {
		type: String,
		required: [true, "Invalid Username"],
		lowercase: true,
		unique: false,
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Invalid email"],
		lowercase: true,
		validate: [validator.isEmail, "Enter a valid email address"],
	},
	password: {
		type: String,
		required: [true, "Invalid password"],
		minLength: [4, "Password must be at least  4 characters"],
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

User.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	delete obj.__v;
	return obj;
};

//Convert Schema to Model
const UserModel = mongoose.model("User", User);

export { UserModel };
