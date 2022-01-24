const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projectsController');

router.post('/', projectsController.find);
router.get('/:id_project',projectsController.deleteProj);

module.exports = router;
