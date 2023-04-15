const db = require('../db/db');

class registerDAO {
    async register(firstname, lastname, username, password, active = false) {
        const obj = await db.insert({ firstname: firstname, lastname: lastname, username: username, password: password, active: active, created_at: new Date() }).into("users").returning('id');
        return obj;
    }

    async updateAUser(firstname, lastname, username, type, active) {
        const obj = await db('users').update({ firstname: firstname, lastname: lastname, active: active, updated_at: new Date() }).where({ 'username': username }).orWhere({'email': username }).returning('id');
        return obj;
    }
    async changePassword(email, hash) {
        const obj = await db('users').update({ password: hash, updated_at: new Date() }).where({ 'username': email }).returning('id');
        return obj;
    }
}

module.exports = new registerDAO();