const axios = require('axios');
const getSignature = require('../signature');

const sendOrders = (orderType, rate, amount) => {
    const path = '/api/exchange/orders';
    const data = {
        pair: 'btc_jpy',
        order_type: orderType,
        rate: rate,
        amount: amount
    }
    const signature = getSignature(path, data);

    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'https://coincheck.com' + path,
            data: data,
            headers: signature
        }).then(res => {
            try {
                const data = res.data;

                resolve(data);
            } catch (err) {
                const message =
                    'Error at sendOrders()\n' +
                    err;
                reject(message);
            }
        }).catch(err => {
            const message =
                'Error at sendOrders()\n' +
                err;
            reject(message);;
        });
    });
};

module.exports = sendOrders;
