import { Schema, model } from "mongoose";

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

const User = model("users", UserSchema);

export default User;
