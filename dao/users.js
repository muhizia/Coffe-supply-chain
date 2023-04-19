const db = require('../db/db');

class UserDAO {

    async getUserByID(id) {
        const obj = await db.select('id', 'email', 'firstname', 'lastname', 'active').from('users').where({ 'id': id });
        return obj;
    }
    async getUserByEmail(email){
        const obj = await db.select('id', 'email', 'password', 'firstname', 'lastname', 'active').from('users').where({ 'email': email });
        return obj;
    }
    async getUsers() {
        const obj = await db.select('id', 'email', 'firstname', 'lastname', 'active').from('users');
        return obj;
    }

    async updateUser(user, id) {
        const obj = await db.select('id', 'email', 'firstname', 'lastname', 'active').from('users');
        return obj;
    }

    async create(user_detail){
        const obj = await db.insert(user_detail).into("users").returning('id');
        return obj;
    }
    async changePassword(email, hash) {
        const obj = await db('users').update({ password: hash, updated_at: new Date() }).where({ 'email': email }).returning('*');
        return obj;
    }
    
}

module.exports = new UserDAO();
