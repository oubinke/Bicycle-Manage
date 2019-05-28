/**
 * 获取现在的时间，并将时间的格式转换为：YY-MM-DD hh:mm:ss
 */

function getFormatTime() {
    var date = new Date();
    var time = {
        Y: date.getFullYear(),
        M: date.getMonth() + 1,
        D: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };
    for (var key in time) {
        time[key] = time[key] < 10 ? ('0' + time[key]) : time[key];
    }
    return time.Y + '-' + time.M + '-' + time.D + ' ' + time.h + ':' + time.m + ':' + time.s;
}

module.exports = {
    getFormatTime: getFormatTime
}
