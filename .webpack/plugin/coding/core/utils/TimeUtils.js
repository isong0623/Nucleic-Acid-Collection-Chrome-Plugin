Date.prototype.Format = function (fmt) { /*author: meizz */
    var o = {
        "M+": this.getMonth() + 1, /*月份 */
        "d+": this.getDate(), /*日 */
        "h+": this.getHours(), /*小时 */
        "m+": this.getMinutes(), /*分 */
        "s+": this.getSeconds(), /*秒 */
        "q+": Math.floor((this.getMonth() + 3) / 3), /*季度 */
        "S": this.getMilliseconds() /*毫秒 */
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }

    return fmt;
};

class TimeUtils{
    static parseTimestamp2yyyyMMddFormat(timestamp){
        let date = timestamp;
        if(date.constructor != Number){
            try{date = parseInt(date);}catch (e) {}
        }
        const time  = new Date();
        time.setTime(date);
        const year  = time.getFullYear();
        const month = time.getMonth()+1;
        const day   = time.getDate();

        return year + "_" + (month<10?"0":"")+month + "_" +(day<10?"0":"") + day;
    }

    static parseTimestamp2ZhFormat(timestamp){
        let date = timestamp;
        if(date.constructor != Number){
            try{date = parseInt(date);}catch (e) {}
        }
        const time  = new Date();
        time.setTime(date);
        const year  = time.getFullYear();
        const month = time.getMonth()+1;
        const day   = time.getDate();

        return year + "年" + (month<10?"0":"")+month + "月" +(day<10?"0":"") + day+"日";
    }
}