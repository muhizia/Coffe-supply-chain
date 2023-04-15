const db = require('../db/db');

class UserDAO {

    async getUserByID(email) {
        const obj = await db.select('id', 'username', 'firstname', 'lastname', 'active', 'password').from('users').where({ 'username': email }).orWhere({'email': email});
        return obj;
    }

    async getUsers() {
        const obj = await db.select('id', 'username', 'firstname', 'lastname', 'active').from('users');
        return obj;
    }
}

module.exports = new UserDAO();
