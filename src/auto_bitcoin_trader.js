const getOrderBooks = require('./api/order_books');

const autoBitcoinTrader = async() => {
    const orderBooks = await getOrderBooks();

    return orderBooks;
}

autoBitcoinTrader().then(value => {
    console.log(value);
}).catch(error => {
    console.log(error);
});
