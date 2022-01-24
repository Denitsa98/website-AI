const express = require('express');
const router = express.Router();

const partic_projController = require('../controllers/partic_projController');

router.get('/:participant_id_participant/:project_id_project', partic_projController.deleteP_Proj);

module.exports = router;