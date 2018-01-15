const timestamp = () => {
    const month = ('0' + new Date().getMonth()).slice(-2);
    const date = ('0' + new Date().getDate()).slice(-2);
    const hours = ('0' + new Date().getHours()).slice(-2);
    const minutes = ('0' + new Date().getMinutes()).slice(-2);
    const seconds = ('0' + new Date().getSeconds()).slice(-2);
    const millisec = ('0' + new Date().getMilliseconds()).slice(-2);
    return { month, date, hours, minutes, seconds, millisec };
}

module.exports = timestamp;
