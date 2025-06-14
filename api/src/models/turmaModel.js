const db = require('../config/db');

const TurmaModel = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT * FROM turmas');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM turmas WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (nome_turma, serie, ano_letivo) => {
        const [result] = await db.execute(
            'INSERT INTO turmas (nome_turma, serie, ano_letivo) VALUES (?, ?, ?)',
            [nome_turma, serie, ano_letivo]
        );
        return result.insertId;
    },
    getTotalTurmasAtivas: async () => {
        // Supondo que todas as turmas cadastradas são ativas para fins de demonstração
        const [rows] = await db.execute('SELECT COUNT(*) AS total FROM turmas');
        return rows[0].total;
    }
};

module.exports = TurmaModel;
