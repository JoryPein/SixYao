var ganToSixShen = {
	'甲': '青龙',
	'乙': '青龙',
	'丙': '朱雀',
	'丁': '朱雀',
	'戊': '勾陈',
	'己': '螣蛇',
	'庚': '白虎',
	'辛': '白虎',
	'壬': '玄武',
	'癸': '玄武'
}
var sixShenList = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];

// 故易统天心，复卦建始初。长子继父体，因母立兆基。
// 消息应钟律，升降据斗枢。三日出为爽，震受庚西方。
// 八日兑受丁，上弦平如绳。十五干体就，盛满甲东方。
// 蟾蜍与兔魄，日月气双明。蟾蜍视卦节，兔者吐生光。
// 七八道已讫，屈折抵下降。十六转受统，巽辛见平明。
// 艮直于丙南，下弦二十三。坤乙三十日，东北丧其明。
// 节尽相禅与，继体复生龙。壬癸配甲乙，乾坤括始终。
// 七八数十五，九六亦相应。四者合三十，易气索灭藏。<<周易参同契>>

//纳甲口诀：
//乾金甲子外壬午，子寅辰午申戍； 
//震木庚子外庚午，子寅辰午申戍； 
//坎水戊寅外戊申，寅辰午申戍子； 
//艮土丙辰外丙戍，辰午申戍子寅； 
//坤土乙未外癸丑，未巳卯丑亥酉； 
//巽木辛丑外辛未，丑亥酉未巳卯； 
//离火巳卯外巳酉，卯丑亥酉未巳； 
//兑金丁巳外丁亥，巳卯丑亥酉未
var naGan = {
	'乾': {0: '甲', 1: '壬'},
	'坤': {0: '乙', 1: '癸'},
	'震': {0: '庚', 1: '庚'},
	'坎': {0: '戊', 1: '戊'},
	'艮': {0: '丙', 1: '丙'},
	'巽': {0: '辛', 1: '辛'},
	'离': {0: '己', 1: '己'},
	'兑': {0: '丁', 1: '丁'}
}
var naZhi = {
	'乾': {0: '子寅辰', 1: '午申戌'},
	'震': {0: '子寅辰', 1: '午申戌'},
	'坎': {0: '寅辰午', 1: '申戌子'},
	'艮': {0: '辰午申', 1: '戌子寅'},
	'坤': {0: '未巳卯', 1: '丑亥酉'},
	'巽': {0: '丑亥酉', 1: '未巳卯'},
	'离': {0: '卯丑亥', 1: '酉未巳'},
	'兑': {0: '巳卯丑', 1: '亥酉未'}
}
var qin6 = {
	"sw": "父母",
	"ws": "子孙",
	"tw": "兄弟",
	"kw": "官鬼",
	"wk": "妻财"
}
function SixShen(tianGan){
	function getSixShenOrder(name){		
		for(var i in sixShenList){
			if(sixShenList[i] == name){
				return i;
			}
		}
	}
	function getSixShenList(order){
		var list = new Array(6);
		for(var i=0;i<list.length;i++){
			list[i] = sixShenList[(order++)%6];
		}
		return list;
	}
	this.sixShen = ganToSixShen[tianGan];
	this.order = getSixShenOrder(this.sixShen);
	this.list = getSixShenList(this.order);
}
function getTianGanList(guaXiang){
	var gd = new Gua(guaXiang);
	var gdx = new JingGua(gd.zhen);
	var gux = new JingGua(gd.hui);
	var list = new Array(6);
	for(var i=0;i<6;i++){
		list[i] = (i<3)?naGan[gdx.name][0]:naGan[gux.name][1];
	}	
	return list;
}
function getDiZhiList(guaXiang){
	var gd = new Gua(guaXiang);
	var gdx = new JingGua(gd.zhen);
	var gux = new JingGua(gd.hui);
	return naZhi[gdx.name][0]+naZhi[gux.name][1];
}
function getGanZhiList(tianGan, diZhi){
	var list = new Array(6);
	for(var i=0;i<list.length;i++){
		list[i] = tianGan[i]+diZhi[i];
	}
	return list;
}
function getWuXingList(diZhi){
	var list = new Array(6);
	for(var i=0;i<6;i++){
		var yaodz = new DiZhi(diZhi[i]);	
		list[i] = yaodz.wuXing;	
	}
	return list;
}
function getSixQinList(gong, diZhi){
	function getQin6(wuXing,Gong){
		var wuxing = xing5.wuxing;
		for(var i in wuxing){
			if(wuxing[i]['name'] == Gong){			
				return qin6[wuxing[i][wuXing]];
			}
		}
	}
	var jgx = new JingGua(gong);
	var guaWuXing = jgx.wuXing;
	var list = new Array(6);
	for(var i=0;i<list.length;i++){
		var wuXing = getWuXingList(diZhi)
		list[i] = getQin6(wuXing[i], guaWuXing);
	}
	return list;
}
function bianGong(xiang, num) {
	if (num == 0){
		return xiang;
	}
	if (num == 6){
		var lastXiang = bianGong(xiang,num-1);
		var gx = new Gua(lastXiang);
		return gx.zhen + (1-parseInt(lastXiang[3])).toString()+ lastXiang.substr(4,3);
	}
	if (num == 7){
		var lastXiang = bianGong(xiang, num-1);
		return (1-parseInt(lastXiang[0])).toString()+(1-parseInt(lastXiang[1])).toString()+(1-parseInt(lastXiang[2])).toString()+lastXiang.substr(3);
	}
	else{
		var lastXiang = bianGong(xiang, num-1);
		return lastXiang.substr(0,num-1) + (1-parseInt(lastXiang[num-1])).toString()+lastXiang.substr(num);
	}
}
function getGuaGong(guaXiang){
	for(var num=0;num<8;num++){
		var bianGua = bianGong(guaXiang, num);  
		var gx = new Gua(bianGua);
		if(gx.zhen == gx.hui){
			return gx.zhen;
		}
	}
}
function getBianGongShu(guaXiang){
	for(var num=0;num<8;num++){
		var bianGua = bianGong(guaXiang, num);  
		var gx = new Gua(bianGua);
		if(gx.zhen == gx.hui){
			return num;
		}
	}      
}
function getShi(guaXiang){
	return [5,0,1,2,3,4,3,2][getBianGongShu(guaXiang)];
}
function getYing(shi){
	return (shi+3)%6;
}
function getSheng(dizhi, shi){
	var dz = new DiZhi(dizhi);
	return (dz.order-1)%6;
}
function SixYao(guaXiang){
	this.xiang = guaXiang;
	this.gong = getGuaGong(this.xiang);
	this.tianGan = getTianGanList(this.xiang);
	this.diZhi = getDiZhiList(this.xiang);
	this.ganZhi = getGanZhiList(this.tianGan, this.diZhi);
	this.sixQin = getSixQinList(this.gong, this.diZhi);
	this.wuXing = getWuXingList(this.diZhi);
	this.shi = getShi(this.xiang);
	this.ying = getYing(this.shi);
	this.sheng = getSheng(this.diZhi[this.shi], this.shi);

}
function SixYao1(benGua, guaXiang){
	this.xiang = guaXiang;
	this.benGua = benGua;
	this.gong = getGuaGong(this.benGua);
	this.tianGan = getTianGanList(this.xiang);
	this.diZhi = getDiZhiList(this.xiang);
	this.ganZhi = getGanZhiList(this.tianGan, this.diZhi);
	this.sixQin = getSixQinList(this.gong, this.diZhi);
	this.wuXing = getWuXingList(this.diZhi);
}