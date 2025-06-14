const db = require('../config/db');

const FrequenciaModel = {
    recordFrequency: async (aluno_id, turma_id, data_aula, presenca, observacoes) => {
        const [result] = await db.execute(
            'INSERT INTO frequencia (aluno_id, turma_id, data_aula, presenca, observacoes) VALUES (?, ?, ?, ?, ?)',
            [aluno_id, turma_id, data_aula, presenca, observacoes]
        );
        return result.insertId;
    },
    getFrequencyByTurmaAndDate: async (turma_id, data_aula) => {
        const [rows] = await db.execute(
            `SELECT f.*, a.nome AS aluno_nome, a.matricula FROM frequencia f
             JOIN alunos a ON f.aluno_id = a.id
             WHERE f.turma_id = ? AND f.data_aula = ?`,
            [turma_id, data_aula]
        );
        return rows;
    }
};

module.exports = FrequenciaModel;
