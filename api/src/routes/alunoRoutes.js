const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

router.get('/', authMiddleware, alunoController.getAllAlunos);
router.get('/dashboard', authMiddleware, alunoController.getDashboardData); // Nova rota para dados do dashboard
router.get('/:id', authMiddleware, alunoController.getAlunoById);
router.post('/', authMiddleware, alunoController.createAluno);
router.put('/:id', authMiddleware, alunoController.updateAluno);
router.delete('/:id', authMiddleware, alunoController.deleteAluno);

module.exports = router;
