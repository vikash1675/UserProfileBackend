const express = require('express');
const router = express.Router();

const userController = require('../Controller/UserController');
const auth = require('../Middleware/auth')


router.post("/register", userController.UserCreate);

router.post('/login', userController.Userlogin);

router.get('/profile/:id', auth.verifyToken, userController.getUserProfileId);

router.put('/updateProfile/:id', auth.verifyToken, userController.updateUserProfile);

module.exports = router;