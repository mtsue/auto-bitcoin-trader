const axios = require('axios');
const getSignature = require('../signature');

const sendCancel = (id) => {
    const path = `/api/exchange/orders/${id}`
    const signature = getSignature(path);

    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: 'https://coincheck.com' + path,
            headers: signature
        }).then(res => {
            try {
                const data = res.data;

                resolve(data);
            } catch (err) {
                const message =
                    'Error at sendCancel()\n' +
                    err;
                reject(message);
            }
        }).catch(err => {
            const message =
                'Error at sendCancel()\n' +
                err;
            reject(message);
        });
    });
};
