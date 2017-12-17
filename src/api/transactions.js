const axios = require('axios');
const getSignature = require('../signature');

const getTransactions = () => {
    const path = '/api/exchange/orders/transactions';
    const signature = getSignature(path);

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://coincheck.com' + path,
            headers: signature
        }).then(res => {
            try {
                const data = res.data;

                resolve(data);
            } catch (err) {
                const message =
                    'Error at getTransactions()\n' +
                    err;
                reject(message);
            }
        }).catch(err => {
            const message =
                'Error at getTransactions()\n' +
                err;
            reject(message);
        });
    });
}

module.exports = getTransactions;
