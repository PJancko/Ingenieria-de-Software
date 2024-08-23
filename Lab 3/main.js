const express = require('express');
const UserService = require('./userService');

const app = express();
const port = 3000;

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de usuarios');
  });

const userService = new UserService();

app.get('/users', (req, res) => {
  res.json(userService.getUsers());
});

app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const newUser = userService.addUser(username, password);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;
  const updatedUser = userService.editUser(id, username, password);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedUser = userService.deleteUser(id);
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});