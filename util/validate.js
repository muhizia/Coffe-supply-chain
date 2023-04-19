const bcrypt = require('bcrypt');


const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
}
const validatePasword = (pwd) => {
    const check = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    return check.test(pwd);
}
const isNumeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const removeUndefined = (data)=>{
    for (let key in data) {
        if (data[key] === undefined) {
          delete data[key];
        }
    }
    return data
}

async function getHash(pwd) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pwd, salt);
    return hash;
}

module.exports = { validatePasword, validateEmail, isNumeric, removeUndefined, getHash };