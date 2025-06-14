const db = require('../config/db');

const UserModel = {
    findByEmail: async (email) => {
        const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },
    create: async (nome, email, senhaHash, tipo_usuario) => {
        const [result] = await db.execute(
            'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)',
            [nome, email, senhaHash, tipo_usuario]
        );
        return result.insertId;
    }
};

module.exports = UserModel;
