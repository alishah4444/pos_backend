const http = require('http');
const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./src/model/user');

const applicationServer = express();

applicationServer.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
applicationServer.use(bodyParser.json({ limit: '5mb', extended: true }));

const httpServer = http.createServer(applicationServer);
const mongoDBKey = require('./src/key').mongoDbKey;

const userRoute = require('./src/route/userRoute');
const productRoute = require('./src/route/productRoute');
// const dbKey = `mongodb+srv://alishahdsu:Admin123@cluster0.f5kbbga.mongodb.net/node-pos?retryWrites=true&w=majority`;

// const httpsServer = https.createServer(httpsCredentials, applicationServer);

mongoose
	.connect(mongoDBKey)
	.then((result) => {
		httpServer.listen(PORT);
		console.log('success');
		applicationServer.use('/user', userRoute);
		applicationServer.use('/product', productRoute);
	})
	.catch((err) => {
		console.log(err);
		console.log('failed');
	});

// applicationServer.get('/test-user', (req, res) => {
// let user = new User({
// 	username: 'admin@gmail.com',
// 	password: 'Admin@12',
// 	phoneNo: '+124569386',
// 	role: 1,
// });

// user.save()
// 	.then((result) => res.send(result))
// 	.catch((err) => res.send(err));
// });

// applicationServer.get('/get-user', (req, res) => {
// 	User.find((err, users) => {
// 		!err ? res.send(users) : res.send({ err: 'error' });
// 	});
// });
