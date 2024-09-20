// services/UserService.js
const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');

class UserService {
  static login(username, password, callback) {
    // Busca el usuario en la base de datos por username
    UserRepository.getByUsername(username, (err, user) => {
      if (err || !user) {
        return callback('Usuario no encontrado');
      }

      // Compara la contraseña usando bcrypt
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return callback('Error al comparar contraseñas');
        }
        if (isMatch) {
          return callback(null, user); // Si es correcto, devuelve el usuario
        } else {
          return callback('Contraseña incorrecta');
        }
      });
    });
  }
}

module.exports = UserService;