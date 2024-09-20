const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { UserController, upload } = require('./controllers/UserController');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.urlencoded({ extended: false }));

// Configurar sesiones (DEBE ESTAR ANTES de acceder a req.session)
app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true
}));

// Middleware para pasar la sesión de usuario a las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.successMessage = req.session.successMessage; // Pasar el mensaje de éxito a la vista
  res.locals.errorMessage = req.session.errorMessage; // Pasar el mensaje de error a la vista
  delete req.session.successMessage; // Limpiar el mensaje de éxito después de usarlo
  delete req.session.errorMessage; // Limpiar el mensaje de error después de usarlo
  next();
});


function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    return next(); // Usuario autenticado, continuar.
    console.log('Usuario autenticado');
  } else {
    res.redirect('/users/login'); // Redirigir al formulario de login si no está autenticado.
    console.log('Usuario no autenticado');
  }
}


// Rutas
app.get('/users', UserController.index);
app.get('/users/create', UserController.create);
app.post('/users/login', UserController.login);
app.post('/users', upload.single('imagen'), UserController.store);
app.get('/users/login', UserController.loginForm);
app.get('/users/login', (req, res) => {
  res.render('users/login', { errorMessage: req.session.errorMessage }); // Pasar el mensaje de error
  delete req.session.errorMessage; // Limpiar el mensaje después de usarlo
});
app.get('/users/:id', UserController.show);
app.get('/users/:id/edit', UserController.edit);
app.get('/users/:id/edit', ensureAuthenticated, UserController.edit);
app.get('/users/:id', ensureAuthenticated, UserController.show);
app.post('/users/:id', upload.single('imagen'), UserController.update);
app.post('/users/:id/delete', UserController.delete);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
