const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//Middleware for validation
function validationRepositoryId(req, res, next){
  const { id } = req.params;

  if(!isUuid(id)){
    return res.status(400).json({ error: 'Invalid repository ID.'});
  }
  return next();
}

app.use('/repositories/:id', validationRepositoryId);

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs, likes } = request.body;

  const repository = {id: uuid(), title, url, techs, likes: 0};
  repositories.push(repository);

  return response.json(repository);  
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  if(likes > 0){
    return response.status(403).send({likes: 0});
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  }

  repositories[repositoryIndex] = repository;
  return response.json(repository);    
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({ error: 'Repository not found.'});
  }
  // remove register
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();  
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if(!repository){
    return response.status(400).json({error: 'Repository its not exists!'});
  }
  repository.likes++;

  return response.json(repository);
});

module.exports = app;
