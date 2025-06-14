const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, turmaController.getAllTurmas);
router.get('/:id', authMiddleware, turmaController.getTurmaById); // Adicionado para edição
router.post('/', authMiddleware, turmaController.createTurma);
router.put('/:id', authMiddleware, turmaController.updateTurma); // Adicionado para edição
router.delete('/:id', authMiddleware, turmaController.deleteTurma); // Adicionado para exclusão

module.exports = router;
