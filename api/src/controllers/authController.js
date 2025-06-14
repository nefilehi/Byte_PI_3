const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await UserModel.findByEmail(email);
            if (!user) {
                return res.status(400).json({ message: 'Credenciais inválidas' });
            }

            const isMatch = await bcrypt.compare(password, user.senha);
            if (!isMatch) {
                return res.status(400).json({ message: 'Credenciais inválidas' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email, tipo_usuario: user.tipo_usuario },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token, user: { id: user.id, nome: user.nome, email: user.email, tipo_usuario: user.tipo_usuario } });
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    register: async (req, res) => {
        const { nome, email, password, tipo_usuario } = req.body;
        try {
            let user = await UserModel.findByEmail(email);
            if (user) {
                return res.status(400).json({ message: 'Email já registrado' });
            }

            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(password, salt);

            const userId = await UserModel.create(nome, email, senhaHash, tipo_usuario || 'Professor');
            res.status(201).json({ message: 'Usuário registrado com sucesso', userId });
        } catch (error) {
            console.error('Erro no registro:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = authController;
