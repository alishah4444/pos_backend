require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.encryptUserPassword = (password) => {
	return new Promise((resolve, reject) => {
		return bcrypt.hash(password, saltRounds, function (err, hash) {
			return resolve(hash);
		});
	});
};

exports.decryptUserPassword = (password) => {
	bcrypt.compare(password, hash, function (err, result) {
		// result == false
	});
};

exports.authenticationCheckforUser = function (req, res, next) {
	const Token = req.headers['authorization']?.split(' ')[1];
	if (Token == null) return res.json({ status: 401, message: 'Invalid authentication' });

	jwt.verify(Token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};
