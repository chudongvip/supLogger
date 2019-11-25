/**
 * 日期格式化
 *
 * @param {*} formatType 格式	YYYY*MM*DD hh*mm*ss
 * @returns 随机生成的number
 */
export const timesToDate = (timestamp: number, formatType: string) => {
	let timeType = "YYYY-MM-DD hh:mm:ss";
	if (typeof timestamp !== "number") {
		throw new Error("[timesToDate]: timestamp must be number");
	}
	if (
		formatType && typeof formatType === "string"
	) {
		timeType = formatType;
	}
	let dateTimes = timestamp || Date.now();
	let dateNow = new Date(dateTimes) || new Date(dateTimes);
	let fYear = dateNow.getFullYear();
	let fMonth = dateNow.getMonth()+1;
	let fDate = dateNow.getDate();
	
	let fHours = dateNow.getHours();
	let fMinutes = dateNow.getMinutes();
	let fSeconds = dateNow.getSeconds();
	
	if (timeType.indexOf("YYYY") > -1) {
		timeType = timeType.replace('YYYY', item => {
			return ''+fYear;
		});
	}
	
	if (timeType.indexOf("MM") > -1) {
		timeType = timeType.replace('MM', item => {
			return fMonth < 10 ? '0'+fMonth : ''+fMonth;
		});
	} else if (timeType.indexOf("M") > -1) {
		timeType = timeType.replace('M', item => {
			return ''+fMonth;
		});
	}
	
	if (timeType.indexOf("DD") > -1) {
		timeType = timeType.replace('DD', item => {
			return fDate < 10 ? '0'+fDate : ''+fDate;
		});
	} else if (timeType.indexOf("D") > -1) {
		timeType = timeType.replace('D', item => {
			return ''+fDate;
		});
	}
	
	if (timeType.indexOf("hh") > -1) {
		timeType = timeType.replace('hh', item => {
			return fHours < 10 ? '0'+fHours : ''+fHours;
		});
	} else if (timeType.indexOf("h") > -1) {
		timeType = timeType.replace('h', item => {
			return ''+fHours;
		});
	}
	
	if (timeType.indexOf("mm") > -1) {
		timeType = timeType.replace('mm', item => {
			return fMinutes < 10 ? '0'+fMinutes : ''+fMinutes;
		});
	} else if (timeType.indexOf("m") > -1) {
		timeType = timeType.replace('m', item => {
			return ''+fMinutes;
		});
	}
	
	if (timeType.indexOf("ss") > -1) {
		timeType = timeType.replace('ss', item => {
			return fSeconds < 10 ? '0'+fSeconds : ''+fSeconds;
		});
	} else if (timeType.indexOf("s") > -1) {
		timeType = timeType.replace('s', item => {
			return ''+fSeconds;
		});
	}
	
	return timeType;
};