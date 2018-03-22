function addDate(){
	function testLeapMonth(year){
		return (year%4 == 0 && year%100 != 0 || year%400 == 0)?1:0;
	};
	function countDay(year, month, day, mYear, mMonth, mDay){
		var monthList = [31,28,31,30,31,30,31,31,30,31,30,31];
		var dayCount = day - mDay;
		if(testLeapMonth(year)) {
			monthList[1] = 29;
		};
		var monthCount = 0;
		for(var i=mMonth;i<month;i++) {
			monthCount += monthList[i-1];
		};
		var yearCount = 0;
		for(var i=mYear;i<year;i++) {
			if(testLeapMonth(i)){
				yearCount += 366;
			}
			else{    
				yearCount += 365;
			};
		};
		return yearCount + monthCount + dayCount;
	};
	function getGanZhi(order){
		var TIANGAN = ['癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬'];
		var DIZHI = ['亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌'];
		return TIANGAN[order%10]+DIZHI[order%12];
	}
	var d = new Date();
	this.year = d.getFullYear();
	this.month = d.getMonth()+1;
	this.day = d.getDate();
	this.mYear = 2000;
	this.mMonth = 1;
	this.mDay = 1;
	this.mGZ = 55;// 2000/01/01 戊午
	this.dayCount = countDay(this.year, this.month, this.day, this.mYear, this.mMonth, this.mDay);
	this.riGanZhi = getGanZhi(this.dayCount+this.mGZ);
};