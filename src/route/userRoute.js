const express = require('express');
const { authenticationCheckforUser } = require('../common/common');
const router = express();

// Require controller modules.
const userController = require('../controller/user');

/// USERS ROUTES

router.get('/getUser', userController.getAllUsersData);
router.post('/createUser', userController.createNewUser);
router.post('/login', userController.Login);
router.post('/addNewProduct', authenticationCheckforUser, userController.addNewProductItem);
router.post('/refreshToken', userController.refreshJwtToken);

module.exports = router;
