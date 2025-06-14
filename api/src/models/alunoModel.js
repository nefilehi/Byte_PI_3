const db = require('../config/db');

const AlunoModel = {
    getAll: async (search = '', turma_nome = '', status = '', turma_id = null) => { // Adicionado turma_id
        let query = `
            SELECT a.*, t.nome_turma FROM alunos a
            LEFT JOIN turmas t ON a.turma_id = t.id
            WHERE 1=1
        `;
        const params = [];

        if (search) {
            query += ` AND (a.nome LIKE ? OR a.email LIKE ? OR a.cpf LIKE ? OR a.matricula LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
        }
        if (turma_nome) { // Para filtro por nome da turma (alunos.html)
            query += ` AND t.nome_turma = ?`;
            params.push(turma_nome);
        }
        if (status) {
            query += ` AND a.status_aluno = ?`;
            params.push(status);
        }
        if (turma_id) { // Para filtro por ID da turma (relatórios.html)
            query += ` AND a.turma_id = ?`;
            params.push(turma_id);
        }

        const [rows] = await db.execute(query, params);
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.execute('SELECT a.*, t.nome_turma FROM alunos a LEFT JOIN turmas t ON a.turma_id = t.id WHERE a.id = ?', [id]);
        return rows[0];
    },
    create: async (nome, email, matricula, cpf, data_nascimento, status_aluno, turma_id) => {
        const [result] = await db.execute(
            'INSERT INTO alunos (nome, email, matricula, cpf, data_nascimento, status_aluno, turma_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, email, matricula, cpf, data_nascimento, status_aluno, turma_id]
        );
        return result.insertId;
    },
    update: async (id, nome, email, matricula, turma_id) => { // Pode ser expandido para mais campos
        const [result] = await db.execute(
            'UPDATE alunos SET nome = ?, email = ?, matricula = ?, turma_id = ? WHERE id = ?',
            [nome, email, matricula, turma_id, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM alunos WHERE id = ?', [id]);
        return result.affectedRows;
    },
    getTotalAlunos: async () => {
        const [rows] = await db.execute('SELECT COUNT(*) AS total FROM alunos');
        return rows[0].total;
    },
    getAlunosAtivos: async () => {
        const [rows] = await db.execute('SELECT COUNT(*) AS ativos FROM alunos WHERE status_aluno = "Ativo"');
        return rows[0].ativos;
    },
    getAlunosInativos: async () => { // Adicionado para o dashboard de alunos
        const [rows] = await db.execute('SELECT COUNT(*) AS inativos FROM alunos WHERE status_aluno = "Inativo"');
        return rows[0].inativos;
    },
    getByTurma: async (turmaId) => {
        const [rows] = await db.execute('SELECT id, nome, matricula, email FROM alunos WHERE turma_id = ?', [turmaId]);
        return rows;
    }
};

module.exports = AlunoModel;
