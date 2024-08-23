const User = require('./user');

class UserService {
  constructor() {
    this.userList = [];
    this.generateRandomUsers(3);
    this.addSpecificUser("Pablo Jancko", "123456");
  }

  generateRandomUsers(count) {
    for (let i = 0; i < count; i++) {
      const id = i + 1;
      const username = `user${id}`;
      const password = Math.random().toString(36).substring(7);
      this.userList.push(new User(id, username, password));
    }
  }

  addSpecificUser(username, password) {
    const id = this.userList.length + 1;
    const newUser = new User(id, username, password);
    this.userList.push(newUser);
    return newUser;
  }

  getUsers() {
    return this.userList;
  }

  addUser(username, password) {
    const id = this.userList.length + 1;
    const newUser = new User(id, username, password);
    this.userList.push(newUser);
    return newUser;
  }

  editUser(id, username, password) {
    const userIndex = this.userList.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.userList[userIndex].username = username;
      this.userList[userIndex].password = password;
      return this.userList[userIndex];
    }
    return null;
  }

  deleteUser(id) {
    const userIndex = this.userList.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      return this.userList.splice(userIndex, 1)[0];
    }
    return null;
  }
}

module.exports = UserService;