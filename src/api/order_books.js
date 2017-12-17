const axios = require('axios');

const getOrderbooks = () => {
    const path = '/api/order_books';

    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'https://coincheck.com' + path
        }).then(res => {
            try {
                const data = res.data;

                resolve(data);
            } catch (err) {
                const message =
                    'Error at getOrderBooks()\n' +
                    err;
                reject(message);
            }
        }).catch(err => {
            const message =
                'Error at getOrderBooks()\n' +
                err;
            reject(message);
        });
    });
};

module.exports = getOrderbooks;
