const db = require('../config/db');

const UserModel = {
    getAll: async () => {
        const [rows] = await db.execute('SELECT id, nome, email, papel FROM usuarios'); // Não retornar senha
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.execute('SELECT id, nome, email, papel FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    },
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (nome, email, senhaHash, papel) => {
        const [result] = await db.execute(
            'INSERT INTO usuarios (nome, email, senha, papel) VALUES (?, ?, ?, ?)',
            [nome, email, senhaHash, papel]
        );
        return result.insertId;
    },
    update: async (id, nome, email, papel, senhaHash = null) => {
        let query = 'UPDATE usuarios SET nome = ?, email = ?, papel = ?';
        const params = [nome, email, papel];
        if (senhaHash) {
            query += ', senha = ?';
            params.push(senhaHash);
        }
        query += ' WHERE id = ?';
        params.push(id);
        const [result] = await db.execute(query, params);
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
        return result.affectedRows;
    },
    countAdministrators: async () => {
        const [rows] = await db.execute('SELECT COUNT(*) AS total FROM usuarios WHERE papel = "Administrador"');
        return rows[0].total;
    }
};

module.exports = UserModel;
