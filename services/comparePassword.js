const bcrypt = require('bcrypt');

const compare = async function(password, hashPassword) {
    try {
        const comparePassword = await bcrypt.compare(password, hashPassword);
        return comparePassword
    } catch (error) {
        console.log(error)
    }
}

module.exports = compare