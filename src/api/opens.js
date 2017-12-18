const axios = require('axios');
const getSignature = require('../signature');

const getOpens = () => {
    const path = '/api/exchange/orders/opens';
    const signature = getSignature(path);

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://coincheck.com' + path,
            headers: signature
        }).then(res => {
            try {
                const data = res.data
                const orders = data.orders;

                resolve(orders);
            } catch (err) {
                const message =
                    'Error at getOpens()\n' +
                    err;
                reject(message);
            }
        }).catch(err => {
            const message =
                'Error at getOpens()\n' +
                err;
            reject(message);
        });
    });
};

module.exports = getOpens;
