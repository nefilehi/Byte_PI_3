const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, turmaController.getAllTurmas);
router.post('/', authMiddleware, turmaController.createTurma);

module.exports = router;
