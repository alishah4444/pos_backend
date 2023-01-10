const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema(
	{
		Name: {
			type: String,
			require: true,
		},
		Description: {
			type: String,
			require: true,
		},
		Price: {
			type: Number,
			require: true,
		},
		productTag: {
			type: String,
			require: true,
		},
		paymentType: {
			type: String,
			require: true,
		},
		currency: {
			type: String,
			require: true,
		},
		avatar: {
			type: String,
			require: true,
		},
		userContact: {
			type: Number,
			require: true,
		},
	},
	{ timestamps: true }
);

const product = mongoose.model('product', productSchema);
module.exports = product;
