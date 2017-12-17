const crypto = require('crypto');
require('dotenv').config();

const getSignature = (path, data) => {
    const accessKey = process.env.ACCESS_KEY;
    const secretKey = process.env.SECRET_ACCESS_KEY;

    const nonce = new Date().getTime();
    const url = 'https://coincheck.com' + path;
    const body = data === undefined ? '' : JSON.stringify(data);
    const message = nonce + url + body;
    const signature = crypto
        .createHmac('sha256', secretKey)
        .update(message)
        .digest('hex');

    return {
        'ACCESS-KEY': accessKey,
        'ACCESS-NONCE': nonce,
        'ACCESS-SIGNATURE': signature
    };
}

module.exports = getSignature;
