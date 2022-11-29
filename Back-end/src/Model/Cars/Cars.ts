import mongoose from "mongoose";

const Schema = mongoose.Schema;
//Create Schema
const Cars = new Schema({
	brand: {
		type: String,
		required: [true, "Car: is a required field"],
		lowercase: true,
	},
	model: {
		type: String,
		required: [true, "model: is a required field"],
		lowercase: true,
	},
	name: {
		type: String,
		required: [true, "name: is a required field"],
		lowercase: true,
	},
	yearOfFabrication: {
		type: Number,
		required: [true, "yearOfFabrication: is a required field"],
		lowercase: true,
	},
	chassis: {
		type: String,
		required: [true, "chassis: is a required field"],
		lowercase: true,
		unique: true,
		minlength: [17, "Chassi must have 17 characteres"],
		maxlength: [17, "Chassi must have 17 characteres"],
	},
	color: {
		type: String,
		required: [true, "color: is a required field;"],
		lowercase: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

Cars.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.__v;
	return obj;
};

const CarModel = mongoose.model("Cars", Cars);

export { CarModel };
