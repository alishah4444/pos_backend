require('dotenv').config();
const { encryptUserPassword } = require('../common/common');
const userModal = require('../model/user');
const _ = require('lodash');
const jwt = require('jsonWebtoken');

exports.getAllUsersData = function (req, res, next) {
	userModal.find((err, users) => {
		!err ? res.send(users) : res.send({ err: 'error' });
	});
};

exports.createNewUser = function (req, res, next) {
	if (!_.isEmpty(req.body)) {
		encryptUserPassword(req.body.password)
			.then((pass) => {
				let user = new userModal({
					username: req.body.username,
					password: pass,
					phoneNo: req.body.phoneNo,
					role: req.body.role || 1,
				});

				user.save()
					.then((result) => res.send(result))
					.catch((err) => res.send(err));
			})
			.catch((err) => res.send({ status: 400, message: 'Failed to Create User' }));
	} else {
		res.send('error creating');
	}
};

exports.Login = function (req, res, next) {
	let userData = req.body;
	const JWTToken = generateJWTToken(userData);
	const RefreshToken = jwt.sign(userData, process.env.JWT_ACCESS_TOKEN);

	userModal.findOneAndUpdate(
		{ username: userData.username },
		{ refreshToken: RefreshToken },
		{
			new: true,
		},
		(err, userUpdate) => {
			if (err) return res.send({ status: 400, message: err });
			res.send({ status: 200, user: userUpdate, token: JWTToken });
		}
	);
};

exports.addNewProductItem = function (req, res, next) {
	return res.send({ status: 200, user: req.user });
};

exports.refreshJwtToken = function (req, res, next) {
	let refreshToken = req.body.refreshToken;

	userModal.findOne({ username: req.body.username }, (err, user) => {
		if (!refreshToken.includes(user.refreshToken)) return res.send({ status: 401, message: 'invalid token' });

		jwt.verify(refreshToken, process.env.JWT_ACCESS_TOKEN, (err, data) => {
			if (err) return res.send({ status: 403, message: 'invalid token' });
			let token = generateJWTToken(data);

			res.send({ status: 200, token: token });
		});
	});
};

function generateJWTToken(user) {
	return jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '5m' });
}
