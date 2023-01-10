const productModal = require('../model/product');
1;
exports.createNewProduct = function (req, res, next) {
	if (!_.isEmpty(req.body)) {
		let product = new productModal();
		product
			.save(req.body)
			.then((result) => res.send(result))
			.catch((err) => res.send(err));
	} else {
		res.send('error creating');
	}
};

exports.GatherBulkProductData = function (req, res, next) {};
