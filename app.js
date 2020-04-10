const express = require('express');
const app = express();

app.use(express.json());

const projects = [];

//Middleware que verifica se o projeto existe
function checkProjectExists(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({ error: 'Projeto não encontrado!' });
    }

    next();
}

//Middleware contador de requisições
function countRequests(req, res, next) {
    console.count("Nº de requisições");

    next();
}

app.use(countRequests);

//inserindo
app.post('/projects', (req, res) => {
    const { id, name } = req.body;

    const project = {
        id,
        name,
        tasks: []
    }

    projects.push(project);

    res.json(project);
});

//Listar todos
app.get('/projects', (req, res) => {
    res.json(projects);
});


//Atualizar um registro
app.put('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const project = projects.find(p => p.id == id);

    project.name = name;

    res.json(project);
});

//Deletar projeto
app.delete('/projects/:id', checkProjectExists, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    res.send();
});

app.listen(3000);