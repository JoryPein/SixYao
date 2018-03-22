var dz = {
    "dizhi": [{
        "order": 1,
        "name": "子",
        "wuXing": "水",
        "lvlv": "黄钟"
    },{
        "order": 2,
        "name": "丑",
        "wuXing": "土",
        "lvlv": "大吕"
    },{
        "order": 3,
        "name": "寅",
        "wuXing": "木",
        "lvlv": "太簇"
    },{
        "order": 4,
        "name": "卯",
        "wuXing": "木",
        "lvlv": "夹钟"
    },{
        "order": 5,
        "name": "辰",
        "wuXing": "土",
        "lvlv": "姑洗"
    },{
        "order": 6,
        "name": "巳",
        "wuXing": "火",
        "lvlv": "仲吕"
    },{
        "order": 7,
        "name": "午",
        "wuXing": "火",
        "lvlv": "蕤宾"
    },{
        "order": 8,
        "name": "未",
        "wuXing": "土",
        "lvlv": "林钟"
    },{
        "order": 9,
        "name": "申",
        "wuXing": "金",
        "lvlv": "夷则"
    },{
        "order": 10,
        "name": "酉",
        "wuXing": "金",
        "lvlv": "南吕"
    },{
        "order": 11,
        "name": "戌",
        "wuXing": "土",
        "lvlv": "无射"
    },{
        "order": 12,
        "name": "亥",
        "wuXing": "水",
        "lvlv": "应钟"
    }]
}
function DiZhi(diZhiName){
    var dizhi = dz.dizhi;
    function getDiZhiName(order){
        var dizhi = dz.dizhi;
        for(var i in dizhi){
            if(dizhi[i]['order'] == order){
                return dizhi[i]['name'];
            }
        }
    }
    function getDiZhiOrder(name){
        var dizhi = dz.dizhi;
        for(var i in dizhi){
            if(dizhi[i]['name'] == name){
                return dizhi[i]['order'];
            }
        }
    }
    function getWuXing(diZhiName){
        for(var i in dizhi){
            if(dizhi[i]['name'] == diZhiName){
                return dizhi[i]['wuXing'];
            }
        }
    }
    function getXiangChong(name){//地支相冲
        var num = getDiZhiOrder(name)+6;
        return getDiZhiName(num>12?num%12:num);
    }
    this.name = diZhiName;
    this.order = getDiZhiOrder(this.name);
    this.wuXing = getWuXing(this.name);
    this.chong = getXiangChong(this.name);
}