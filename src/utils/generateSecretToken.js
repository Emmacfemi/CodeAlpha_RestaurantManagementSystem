const crypto = require("crypto");

const generateSecretToken = () => {
    const token = crypto.randomBytes(32)
                    toString("hex");

    return token;
}

module.exports = generateSecretToken;