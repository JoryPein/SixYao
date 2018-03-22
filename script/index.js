function zhuangGua(benGua, bianGua){
	function huaGua(yaoDiv, guaXiang){ //画卦
		for(var i in guaXiang){
			var yao = $(yaoDiv).eq(5-i);
			if(guaXiang[i] === '1'){
				yao.removeClass('y0').addClass('y1');
			}else{
				yao.removeClass('y1').addClass('y0');
			}
		}
	}
	function zhuangSixQinGanZhi(dzDiv, guaXiang){ //装六亲干支五行
		var sy = new SixYao(guaXiang);
		var sixQinList = sy.sixQin;
		var tianGanList = sy.tianGan;
		var diZhiList = sy.diZhi;
		var diZhiWuXing = sy.wuXing;
		for(var i=0;i<6;i++){
			var sixQinAndGanZhi = sixQinList[i]+tianGanList[i]+diZhiList[i]+diZhiWuXing[i];
			$(dzDiv).eq(5-i).html(sixQinAndGanZhi);
		}
	}
	function zhuangBianSixQinGanZhi(dzDiv, benGua, guaXiang){
		var sy = new SixYao1(benGua, guaXiang);
		var sixQinList = sy.sixQin;
		var tianGanList = sy.tianGan;
		var diZhiList = sy.diZhi;
		var diZhiWuXing = sy.wuXing;
		for(var i=0;i<6;i++){
			var sixQinAndGanZhi = sixQinList[i]+tianGanList[i]+diZhiList[i]+diZhiWuXing[i];
			$(dzDiv).eq(5-i).html(sixQinAndGanZhi);
		}
	}
	function zhuangShiYing(syDiv, guaXiang){ //装世应
		var sy = new SixYao(guaXiang);
		var shi = sy.shi;
		var ying = sy.ying;
		var sheng = sy.sheng;
		$(syDiv).html("");
		$(syDiv).eq(5-shi).html("世");
		$(syDiv).eq(5-ying).html("应");
		$(syDiv).eq(5-sheng).append("身");
	}
	function zhuangGuaName(gnDiv, guaXiang){//装卦名
		var GX = new Gua(guaXiang);
		var guaName = GX.name;
		$(gnDiv).html(guaName);
		if(gnDiv == 'div.benGua div.guaName'){
			$('#bg-guaName').html(guaName);
		}
	}
	function zhuangBenGua(guaDiv, guaXiang){
		huaGua(guaDiv+' div.gua div.yao div', guaXiang);
		zhuangGuaName(guaDiv+' div.guaName', guaXiang);
		zhuangSixQinGanZhi(guaDiv+' div.gz', guaXiang);
		zhuangShiYing(guaDiv+' div.gua div.shy', guaXiang);
	}
	function zhuangBianGua(guaDiv, benGua, guaXiang){
		huaGua(guaDiv+' div.gua div.yao div', guaXiang);
		zhuangGuaName(guaDiv+' div.guaName', guaXiang);
		zhuangBianSixQinGanZhi(guaDiv+' div.gz', benGua, guaXiang);
		zhuangShiYing(guaDiv+' div.gua div.shy', guaXiang);
	}
	var benGuaDiv = 'div.benGua';
	var bianGuaDiv = 'div.bianGua';
	zhuangBenGua(benGuaDiv, benGua);
	zhuangBianGua(bianGuaDiv, benGua, bianGua)
}
function zhuangGuaCi(guaXiang){
	var gx = new Gua(guaXiang);
	$('div.guaCi').html(gx.guaMean+'：'+gx.guaCi);
}
function zhuangYaoCi(guaXiang, order){
	var gx = new Gua(guaXiang);
	$('div.guaCi').html(gx.name+'之'+gx.yaoOrder[order]+'：'+gx.YaoCi[order]);
}
function getBian(guaXiang, yaoNum){
	return guaXiang.substr(0,yaoNum)+(1-guaXiang[yaoNum])+guaXiang.substr(yaoNum+1,5);
}
function yaoFade(yaoDiv){	
	yaoDiv.hover(function() {
		yaoDiv.addClass('unhover');
		$(this).removeClass('unhover');
		$('#bg-guaName').addClass('bg_unhover');
	}, function() {
		yaoDiv.removeClass('unhover');
		$('#bg-guaName').removeClass('bg_unhover');
	});
}
function zss(riGan, sixShenDiv){
	var ss = new SixShen(riGan);
	for(var i=0;i<6;i++){
		sixShenDiv.eq(5-i).html(ss.list[i]);
	}
}
function zhuangSixShen(riGanZhiDiv, sixShenDiv){		
	var date = new addDate();
	riGanZhiDiv.html(date.riGanZhi);
	var riGan = riGanZhiDiv.text()[0];
	zss(riGan, sixShenDiv);
}
function isGuaXiang(string){ 	
	var pattern=/^[0-1]{6}$/; 
	return pattern.exec(string)?true:false; 
}
$(document).ready(function(){
	var guaXiang = '111111';

	var hash = location.hash.replace('#','');
	location.hash = hash;

	var benGua = isGuaXiang(hash)?hash:guaXiang;

	var riGanZhiDiv = $('div.sixShen div.gua div#riGanZhi');
	var sixShenDiv = $('div.sixShen div.gua div.animal');
	zhuangSixShen(riGanZhiDiv, sixShenDiv);

	var bianGua = benGua;
	zhuangGua(benGua, bianGua);
	zhuangGuaCi(bianGua);

	function writeTianGanSelect(){
		var date = new addDate();		
		var item = '';
		var tgList = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
		for(var i in tgList){
			if(tgList[i] == date.riGanZhi[0]){
				item += '<option selected value=\"'+tgList[i]+'\">'+tgList[i]+'<\/option>';
				continue;
			}
			item += '<option value=\"'+tgList[i]+'\">'+tgList[i]+'<\/option>';
		}
		$('div.sixShen div.gua div.tianganList').html('<select>'+item+'<\/select>');
	}
	writeTianGanSelect();
	//**************************** 鼠标事件  ******************************************	
	$('div.sixShen div.gua div.tianganList select').change(function(event) {
		var tg = $(this).val();
		zss(tg, sixShenDiv);
	});
	var benYaoDiv = $('div.benGua div.gua div.yao');
	var bianYaoDiv = $('div.bianGua div.gua div.yao');
	yaoFade(benYaoDiv);
	yaoFade(bianYaoDiv);
	benYaoDiv.mouseup(function(event){
		if(event.which == 1){
			var yaoNum = 5-($(this).index()-1)/3;
			benGua = getBian(benGua, yaoNum);
			location.hash = benGua;
			bianGua = getBian(bianGua, yaoNum);
			zhuangGua(benGua, bianGua);
			zhuangGuaCi(benGua);
		}
	});
	bianYaoDiv.mouseup(function(event){
		if(event.which == 1){
			var yaoNum = 5-($(this).index()-1)/3;
			bianGua = getBian(bianGua, yaoNum);
			zhuangGua(benGua, bianGua);
			zhuangGuaCi(bianGua);
		}
	});
	benYaoDiv.hover(function(){
		var yaoNum = 5-($(this).index()-1)/3;
		bianGua = getBian(bianGua, yaoNum);
		zhuangGua(benGua, bianGua);
		zhuangYaoCi(benGua, yaoNum);

	}, function(){
		var yaoNum = 5-($(this).index()-1)/3;
		bianGua = getBian(bianGua, yaoNum);
		zhuangGua(benGua, bianGua);
		zhuangGuaCi(benGua);
	});
});