const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAll();
            res.json(users);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserModel.getById(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.json(user);
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { nome, email, password, papel } = req.body;

        try {
            let senhaHash = null;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                senhaHash = await bcrypt.hash(password, salt);
            }

            const affectedRows = await UserModel.update(id, nome, email, papel, senhaHash);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado ou nenhum dado alterado' });
            }
            res.json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const userToDelete = await UserModel.getById(id);
            if (!userToDelete) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            // Lógica para não permitir excluir o último administrador
            if (userToDelete.papel === 'Administrador') {
                const adminCount = await UserModel.countAdministrators();
                if (adminCount <= 1) {
                    return res.status(400).json({ message: 'Não é possível excluir o último usuário administrador.' });
                }
            }

            const affectedRows = await UserModel.delete(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.json({ message: 'Usuário excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = userController;
