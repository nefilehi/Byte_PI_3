require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const alunoRoutes = require('./routes/alunoRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const frequenciaRoutes = require('./routes/frequenciaRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/frequencia', frequenciaRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('Bem-vindo à API EscolaSystem!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
