const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');

router.get('/:id_participant', profileController.viewprofile);

module.exports = router;