const bcrypt = require('bcrypt');

const hashPassword = async function (password) {
    try {
        const genSalt = 10
        const pass = await bcrypt.hash(password, genSalt)
        return pass
    } catch (error) {
        console.log(error);
    }
}

module.exports = hashPassword