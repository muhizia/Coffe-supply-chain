const userDAO = require('../dao/users');

class UserService {
    getUserById(id) {
        return userDAO.getUserByID(id);
    }

    getUsers() {
        return userDAO.getUsers();
    }

    updateUser(user, id) {
        return userDAO.updateUser(user, id);
    }

    create(user_detail){
        return userDAO.create(user_detail);
    }

    getUserByEmail(email){
        return userDAO.getUserByEmail(email);
    }
    
    changePassword(email, hash) {
        return userDAO.changePassword(email, hash);
    }
}

module.exports = new UserService();