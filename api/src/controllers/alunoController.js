const AlunoModel = require('../models/alunoModel');
const TurmaModel = require('../models/turmaModel'); // Para buscar turma_id

const alunoController = {
    getAllAlunos: async (req, res) => {
        try {
            const { search, turma, status } = req.query;
            const alunos = await AlunoModel.getAll(search, turma, status);
            res.json(alunos);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    getAlunoById: async (req, res) => {
        try {
            const { id } = req.params;
            const aluno = await AlunoModel.getById(id);
            if (!aluno) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }
            res.json(aluno);
        } catch (error) {
            console.error('Erro ao buscar aluno por ID:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    createAluno: async (req, res) => {
        const { nome, email, matricula, cpf, data_nascimento, status_aluno, turma_nome } = req.body;
        try {
            let turma_id = null;
            if (turma_nome) {
                const turmas = await TurmaModel.getAll();
                const turmaEncontrada = turmas.find(t => t.nome_turma === turma_nome);
                if (turmaEncontrada) {
                    turma_id = turmaEncontrada.id;
                } else {
                    return res.status(400).json({ message: 'Turma não encontrada' });
                }
            }

            const alunoId = await AlunoModel.create(nome, email, matricula, cpf, data_nascimento, status_aluno || 'Ativo', turma_id);
            res.status(201).json({ message: 'Aluno cadastrado com sucesso', alunoId });
        } catch (error) {
            console.error('Erro ao cadastrar aluno:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    updateAluno: async (req, res) => {
        const { id } = req.params;
        const { nome, email, matricula, turma_nome } = req.body;
        try {
            let turma_id = null;
            if (turma_nome) {
                const turmas = await TurmaModel.getAll();
                const turmaEncontrada = turmas.find(t => t.nome_turma === turma_nome);
                if (turmaEncontrada) {
                    turma_id = turmaEncontrada.id;
                } else {
                    return res.status(400).json({ message: 'Turma não encontrada' });
                }
            }
            const affectedRows = await AlunoModel.update(id, nome, email, matricula, turma_id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Aluno não encontrado ou nenhum dado alterado' });
            }
            res.json({ message: 'Aluno atualizado com sucesso' });
        } catch (error) {
            console.error('Erro ao atualizar aluno:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    deleteAluno: async (req, res) => {
        try {
            const { id } = req.params;
            const affectedRows = await AlunoModel.delete(id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Aluno não encontrado' });
            }
            res.json({ message: 'Aluno excluído com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir aluno:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    },
    getDashboardData: async (req, res) => {
        try {
            const totalAlunos = await AlunoModel.getTotalAlunos();
            const alunosAtivos = await AlunoModel.getAlunosAtivos();
            const totalTurmasAtivas = await TurmaModel.getTotalTurmasAtivas(); // Adicionado da turmaController
            res.json({
                totalAlunos,
                alunosAtivos,
                totalTurmasAtivas,
                // aulasHoje: 12, // Este dado precisaria de mais lógica de negócio ou uma tabela de "aulas"
                // proximasAulas: [ // Este dado também
                //     "1º Ano - Matemática às 08:00",
                //     "2º Ano - Português às 10:00",
                //     "3º Ano - História às 13:00"
                // ]
            });
        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
};

module.exports = alunoController;
