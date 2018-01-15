const {
    getBalance,
    getOpens,
    getOrderBooks,
    getTransactions,
    sendCancel,
    sendOrders
} = require('./api');

const {
    buyTiming,
    sellTiming,
    cancelTiming,
    timestamp,
} = require('./utils');

const canOrder = (orderType, balance, bid) => {
    const jpy = balance.jpy;
    const btc = balance.btc;
    switch (orderType) {
        case 'buy':
            if (0.005 <= jpy / bid) {
                return true;
            }
            return false;
        case 'sell':
            if (0.005 <= btc) {
                return true;
            }
            return false;
    }
}

const autoBitcoinTrader = async () => {
    let initialize = true;
    let buySkip = 5;
    const rate = {};
    const profit = {};

    while (true) {
        try {
            const balance = await getBalance();           // 所持金
            const opens = await getOpens();               // 未完了注文
            const orderBooks = await getOrderBooks();     // 板情報
            const transactions = await getTransactions(); // 注文履歴

            const topBidRate = parseFloat(orderBooks.bids[0][0]);
            const topAskRate = parseFloat(orderBooks.asks[0][0]);

            const isOpens = !!opens.length;

            if (initialize) {
                initialize = false;
                rate.prev = {
                    bid: topBidRate,
                    ask: topAskRate
                };
                rate.my = 0;
                profit.start = parseFloat(balance.jpy);
            }

            rate.current = topBidRate;

            profit.current = parseFloat(balance.jpy);
            profit.total = balance.jpy - profit.start;

            if (!isOpens) {
                if (canOrder('buy', balance, rate.current) && buyTiming(rate.prev, rate.current)) {
                    buySkip--;
                    if (buySkip <= 1) {
                        buySkip = 5;
                        let amountBTC = Math.floor((balance.jpy / rate.current) * 1000000) / 1000000;
                        await sendOrders('buy', rate.current, amountBTC);
                        console.log('Buy', rate.current, amountBTC);
                    } else {
                        console.log('Rate up');
                    }
                } else if (canOrder('sell', balance, rate.current) && sellTiming(rate.my, rate.current, balance.btc)) {
                    await sendOrders('sell', rate.current, balance.btc);
                    console.log('Sell', rate.current, balance.btc);
                } else if (rate.current < rate.prev) {
                    buySkip = 5;
                    console.log('Rate down');
                }
            } else {
                const orderType = opens[0].order_type;
                const orderTime = opens[0].created_at;
                const orderRate = opens[0].rate;
                if (orderType === 'buy' && cancelTiming(orderTime, rate.current, orderRate)) {
                    await sendCancel(opens[0].id);
                    console.log('Cancel');
                } else {
                    if (orderType === 'buy') {
                        console.log('Incompleted buy|' + `${(new Date().getTime() - new Date(orderTime).getTime()).toFixed(3)}`);
                    } else if (orderType === 'sell') {
                        console.log('Incompleted sell');
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
}

autoBitcoinTrader().then(value => {

}).catch(error => {
    console.log(error);
});
