const express = require('express');
const router = express.Router();
const frequenciaController = require('../controllers/frequenciaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/alunos/:turmaId', authMiddleware, frequenciaController.getAlunosByTurmaForFrequency);
router.post('/', authMiddleware, frequenciaController.recordFrequency);
router.get('/:turmaId/:dataAula', authMiddleware, frequenciaController.getFrequencyByTurmaAndDate);

module.exports = router;
