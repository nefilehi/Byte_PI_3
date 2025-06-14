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
    getTurmaById: async (req, res) => { // Novo para GET /turmas/:id
        try {
            const { id } = req.params;
            const turma = await TurmaModel.getById(id);
            if (!turma) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            res.json(turma);
        } catch (error) {
            console.error('Erro ao buscar turma por ID:', error);
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
    },
    updateTurma: async (req, res) => { // Novo para PUT /turmas/:id
        const { id } = req.params;
        const { nome_turma, serie, ano_letivo } = req.body;
        try {
            const affectedRows = await TurmaModel.update(id, nome_turma, serie, ano_letivo);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Turma não encontrada ou nenhum dado alterado' });
            }
            res.json({ message: 'Turma atualizada com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar turma:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    deleteTurma: async (req, res) => { // Novo para DELETE /turmas/:id
        try {
            const { id } = req.params;
            const affectedRows = await TurmaModel.delete(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            res.json({ message: 'Turma excluída com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir turma:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = turmaController;
