const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const { verifyToken, validateToken } = require('./middlewares/tokenMiddleware');
const { verifyAge, verifyAgeEighteen } = require('./middlewares/ageMiddleware');
const { verifyName, verifyNameLength } = require('./middlewares/nameMiddleware');
const { verifyRate, verifyRateInteger, verifyTalk, verifyWatchedAt, 
verifyWatchedAtDateFormat } = require('./middlewares/talkMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerJSON = path.resolve(__dirname, './talker.json');

app.get('/talker', async (req, res) => {
  const data = await fs.readFile(talkerJSON, 'utf-8');
  const talker = JSON.parse(data);
  if (talker.length > 0) {
    return res.status(HTTP_OK_STATUS).json(talker);
  } 
    return res.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const idPeople = req.params.id;
  const data = await fs.readFile(talkerJSON, 'utf-8');
  const talker = JSON.parse(data);
  const filterById = talker.find(({ id }) => id === Number(idPeople));
  if (filterById) {
    return res.status(HTTP_OK_STATUS).json(filterById);
  }
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const token = crypto.randomBytes(8).toString('hex');
    const regex = /\S+@\S+\.\S+/;
    if (!email) {
      return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!regex.test(email)) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
      return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length <= 5) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 
      return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker', 
validateToken, verifyToken, verifyAge, verifyAgeEighteen, verifyName, verifyNameLength, 
verifyTalk, verifyWatchedAt, 
verifyWatchedAtDateFormat, verifyRate, 
verifyRateInteger, async (req, res) => {
  const data = await fs.readFile(talkerJSON, 'utf-8');
  const talker = JSON.parse(data);
  const newTalker = { ...req.body, id: talker.length + 1 };
  const newTalkerFile = [...talker, newTalker];
  await fs.writeFile(path.resolve(__dirname, './talker.json'), JSON.stringify(newTalkerFile));
  res.status(201).json(newTalker);
});

app.put('/talker/:id', validateToken, verifyToken, verifyAge, 
verifyAgeEighteen, verifyName, verifyNameLength, 
verifyTalk, verifyWatchedAt, 
verifyWatchedAtDateFormat, verifyRate, verifyRateInteger, async (req, res) => {
  const { id } = req.params;
  const editTalker = req.body;
  const data = await fs.readFile(path.resolve(__dirname, talkerJSON), 'utf-8');
  const talker = JSON.parse(data);
  const index = talker.findIndex((elem) => Number(elem.id) === Number(id));
  talker[index].name = editTalker.name;
  talker[index].age = editTalker.age;
  talker[index].talk.watchedAt = editTalker.talk.watchedAt;
  talker[index].talk.rate = editTalker.talk.rate;
  await fs.writeFile(path.resolve(__dirname, './talker.json'), JSON.stringify(talker));
  return res.status(200).json(talker[index]);
});

app.delete('/talker/:id', validateToken, verifyToken, async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(path.resolve(__dirname, talkerJSON), 'utf-8');
  const talker = JSON.parse(data);
  const filterTalker = talker.filter((elem) => elem.id !== Number(id));
  await fs.writeFile(path.resolve(__dirname, './talker.json'), JSON.stringify(filterTalker));
  return res.status(204).end();
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
