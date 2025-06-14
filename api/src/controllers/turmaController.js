const TurmaModel = require('../models/turmaModel');

const turmaController = {
    getAllTurmas: async (req, res) => {
        try {
            const turmas = await TurmaModel.getAll();
            res.json(turmas);
        } catch (error) {
            console.error('Erro ao buscar turmas:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    createTurma: async (req, res) => {
        const { nome_turma, serie, ano_letivo } = req.body;
        try {
            const turmaId = await TurmaModel.create(nome_turma, serie, ano_letivo);
            res.status(201).json({ message: 'Turma cadastrada com sucesso', turmaId });
        } catch (error) {
            console.error('Erro ao cadastrar turma:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = turmaController;
