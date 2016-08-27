/**
 * Created by Administrator on 2016/8/26.
 */
var province=document.getElementById("province");
var city=document.getElementById("city");
var district=document.getElementById("district");

function fun(json,obj){
    var frag=document.createDocumentFragment();
    for( var i in json){                                //生成目录
        var optionNode = document.createElement("option");
        optionNode.value = i;
        optionNode.innerHTML=json[i];
        frag.appendChild(optionNode);
    }
    obj.appendChild(frag);
}

fun(areaJson.province,province);

province.onchange=function(){//省级改变，市级清空后再导入
    var curProvince=this.value;
    var boolNum=0;//判断直辖市

    for(var j in areaJson.city[curProvince]){
        boolNum++;
        if(areaJson.district[j]==undefined){//如果不存在就是直辖市
            break;//跳出循环
        }
    }
    console.log(boolNum);
    if(boolNum==1){//直辖市
        district.style.display="";//显示区
        city.style.display="none";//隐藏市
        city.innerHTML=" <option>选择市</option>";
        district.innerHTML="<option>选择区</option>";
        district.disabled=false;
        fun(areaJson.city[curProvince],district);
    }else{
        city.style.display="";
        city.disabled=false;
        city.innerHTML=" <option>选择市</option>";
        district.innerHTML="<option>选择区</option>";
        district.disabled=true;
        fun(areaJson.city[curProvince],city);
    }
};

city.onchange=function(){
    var curCity=this.value;
    if(areaJson.district[curCity]==undefined){//如果区不存在就隐藏区
        district.style.display="none";
    }else{
        district.style.display="";
        district.disabled=false;
        district.innerHTML="<option>选择区</option>";//先清空在导入
        fun(areaJson.district[curCity],district);
    }

};


var json1={
    "province":33,
    "city":3301,
    "district":330109
}
var json2={
    "province":11,
    "city":"",
    "district":1101
}

function newCity(json){
    if(json==null){
        return;
    }
    if(json.province!="" && json.province!=null){
        province.value=json.province;
        province.onchange();
    }
    if(json.city!="" && json.city!=null){
        city.value=json.city;
        city.onchange();
    }
    if(json.district!="" && json.district!=null){
        district.value=json.district;
    }

}
newCity(json2);