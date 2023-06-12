const jwtToken = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const generateAuthToken = async (name,email) => {
    const tokenPaylod = {
        name,
        email
    }
    const token = jwtToken.sign(tokenPaylod,process.env.JWT_SECRET_KEY,{expiresIn : '1h'});
    return token;
}

module.exports = generateAuthToken;