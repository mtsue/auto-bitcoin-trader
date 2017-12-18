const buyTiming = (previousRate, currentRate) => {
    previousRate = parseInt(previousRate);
    currentRate = parseInt(currentRate);

    if (currentRate < previousRate) {
        return true;
    }
    return false;
}

module.exports = buyTiming;
