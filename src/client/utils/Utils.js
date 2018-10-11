export default {
	AutoZero(value) {
		return value < 10 ? '0' + value : value;
	},
	formatDate(fmt, date) {
		date = date || new Date();
		var o = {
			"M+": date.getMonth() + 1, //月份   
			"d+": date.getDate(), //日   
			"h+": date.getHours(), //小时   
			"m+": date.getMinutes(), //分   
			"s+": date.getSeconds(), //秒   
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
			"S": date.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	timeToNum(time) {
		let arr = time.split(':');
		let len = arr.length - 1;
		let max = 0;
		let step = 0;
		while(step <= len) {
			max += (arr[step] * Math.pow(60, len - step));
			step++;
		}

		return max;
	},
	numToTime(num) {
		return this.AutoZero(Math.floor(num / 3660)) + ':' + this.AutoZero(Math.floor(num / 60)) + ':' + this.AutoZero((num % 60));
	}
}
