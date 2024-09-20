// controllers/UserController.js
const UserRepository = require('../repositories/UserRepository');
const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

class UserController { 
  static async store(req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guarda el usuario con la contraseña hasheada
    UserRepository.create({ username, password: hashedPassword }, (err, user) => {
      if (err) {
        req.session.errorMessage = 'Error al crear el usuario';
        return res.redirect('/users/create');
      }

      req.session.successMessage = 'Usuario creado exitosamente';
      res.redirect('/users');
    });
  }
  // Mostrar todos los usuarios
  static index(req, res) {
    UserRepository.getAll((err, users) => {
      if (err) throw err;
      res.render('users/index', { users });
    });
  }

  // Mostrar formulario de creación
  static create(req, res) {
    res.render('users/create');
  }

  // Guardar nuevo usuario
  static store(req, res) {
    const user = {
      ...req.body,
      imagen: req.file ? `/uploads/${req.file.filename}` : null,
      updatedAt: new Date()
    };
    UserRepository.create(user, (err) => {
      if (err) throw err;
      res.redirect('/users');
    });
  }

  // Mostrar un solo usuario
  static show(req, res) {
    const id = req.params.id;
    UserRepository.getById(id, (err, user) => {
      if (err) throw err;
      res.render('users/show', { user });
    });
  }

  // Mostrar formulario de edición
  static edit(req, res) {
    const id = req.params.id;
    UserRepository.getById(id, (err, user) => {
      if (err) throw err;
      res.render('users/edit', { user });
    });
  }

  // Actualizar usuario
  static update(req, res) {
    const id = req.params.id;
    const user = {
      ...req.body,
      imagen: req.file ? `/uploads/${req.file.filename}` : req.body.oldImagen,
      updatedAt: new Date()
    };
    UserRepository.update(id, user, (err) => {
      if (err) throw err;
      res.redirect(`/users/${id}`);
    });
  }

  // Eliminar usuario
  static delete(req, res) {
    const id = req.params.id;
    UserRepository.delete(id, (err) => {
      if (err) throw err;
      res.redirect('/users');
    });
  }

  // Mostrar el formulario de login
  static loginForm(req, res) {
    console.log('Mostrando formulario de login');
    res.render('users/login');
  }
  

// Procesar el login
static login(req, res) {
  const { username, password } = req.body;

  // Llama al servicio de usuario para autenticar
  UserService.login(username, password, (err, user) => {
    if (err || !user) {
      // Si hay un error o el usuario no existe, establecer un mensaje de error
      req.session.errorMessage = 'Nombre de usuario o contraseña incorrectos';
      return res.redirect('/users/login');
    }

    // Guardar el usuario en la sesión
    req.session.user = user;

    // Establecer un mensaje de éxito en la sesión
    req.session.successMessage = 'Inicio de sesión exitoso';

    // Redirigir a la lista de usuarios o cualquier otra página
    return res.redirect('/users');
  });
}




static showUser(req, res) {
  const user = {
    id: 123,  // Asegúrate de que el ID del usuario esté presente
    rol: 'admin',
    imagen: '/path/to/image.jpg',
    updatedAt: '2023-09-20'
  };  // Simulación de datos para el usuario
  res.render('users/show', { user });
}

static showLogin(req, res) {
  res.render('users/login');  // Aquí aseguramos que la vista de login se muestre correctamente
}
}

module.exports = { UserController, upload };
