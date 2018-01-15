const cancelTiming = (orderTime, currentRate, orderRate) => {
    const now = new Date().getTime();
    orderTime = new Date(orderTime).getTime();
    currentRate = parseInt(currentRate);
    orderRate = parseInt(orderRate);

    if (20 * 1000 < now - orderTime) {
        return true;
    }
    if (800 < currentRate - orderRate) {
        return true;
    }
    return false;
}

module.exports = cancelTiming;
