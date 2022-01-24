const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/login", authController.login);

router.get('/', userController.view);
router.post('/', userController.find);
router.get('/:id_participant',userController.delete);

module.exports = router;