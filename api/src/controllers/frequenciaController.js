const FrequenciaModel = require('../models/frequenciaModel');
const AlunoModel = require('../models/alunoModel'); // Para obter alunos por turma

const frequenciaController = {
    getAlunosByTurmaForFrequency: async (req, res) => {
        const { turmaId } = req.params;
        try {
            const alunos = await AlunoModel.getByTurma(turmaId);
            res.json(alunos);
        } catch (error) {
            console.error('Erro ao buscar alunos por turma para frequência:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    recordFrequency: async (req, res) => {
        const { registros } = req.body; // Espera um array de objetos: [{ aluno_id, turma_id, data_aula, presenca, observacoes }]
        try {
            for (const registro of registros) {
                await FrequenciaModel.recordFrequency(
                    registro.aluno_id,
                    registro.turma_id,
                    registro.data_aula,
                    registro.presenca,
                    registro.observacoes
                );
            }
            res.status(201).json({ message: 'Frequência registrada com sucesso' });
        } catch (error) {
            console.error('Erro ao registrar frequência:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    getFrequencyByTurmaAndDate: async (req, res) => {
        const { turmaId, dataAula } = req.params;
        try {
            const frequencia = await FrequenciaModel.getFrequencyByTurmaAndDate(turmaId, dataAula);
            res.json(frequencia);
        } catch (error) {
            console.error('Erro ao buscar frequência:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = frequenciaController;
