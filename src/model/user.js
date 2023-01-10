const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
	{
		username: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		role: {
			type: Number,
		},
		phoneNo: {
			type: Number,
			require: true,
		},
		loginType: {
			type: Number,
			require: true,
		},
		refreshToken: { type: String },
	},
	{ timestamps: true }
);

const user = mongoose.model('user', userSchema);
module.exports = user;
