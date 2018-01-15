const sellTiming = (orderRate, currentRate, orderAmount) => {
    orderRate = parseInt(orderRate);
    currentRate = parseInt(currentRate);
    orderAmount = parseFloat(orderRate);

    if (orderRate < currentRate) {
        if (1.0 <= orderRate * orderAmount) {
            return true;
        }
    }
    return false;
};

module.exports = sellTiming;
