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
    update: async (id, nome_turma, serie, ano_letivo) => { // Novo para UPDATE
        const [result] = await db.execute(
            'UPDATE turmas SET nome_turma = ?, serie = ?, ano_letivo = ? WHERE id = ?',
            [nome_turma, serie, ano_letivo, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => { // Novo para DELETE
        // Primeiro, desassociar alunos desta turma para evitar erro de chave estrangeira
        await db.execute('UPDATE alunos SET turma_id = NULL WHERE turma_id = ?', [id]);
        const [result] = await db.execute('DELETE FROM turmas WHERE id = ?', [id]);
        return result.affectedRows;
    },
    getTotalTurmasAtivas: async () => {
        const [rows] = await db.execute('SELECT COUNT(*) AS total FROM turmas');
        return rows[0].total;
    }
};

module.exports = TurmaModel;
