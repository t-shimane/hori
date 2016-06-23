(function(){

window.onload = function (){

	var commonList = ModuleManager.module("myapp.common.model.commonList");
	var result = ModuleManager.module("myapp.summary.model.result");

	var parent = document.getElementById("resultList");

	var params = [];
	params.push({hori_value:"大鯨",update_time:"2016/01/01"});
	params.push({hori_value:"熊野",update_time:"2014/12/31"});
	params.push({hori_value:"阿武隈",update_time:"1999/01/01"});
	params.push({hori_value:"鈴谷",update_time:"2020/01/01"});

	/*
	for(var i = 1; i < 1000; i ++){
		params.push({hori_name:"test",hori_count:"1",hori_last_update:"2020/01/01"});
	}
	*/

	var resultList = commonList(params, result);
	parent.appendChild(resultList.createElement());

	//新規登録ボタンの動作
	document.getElementById("add").addEventListener("click", function(){
		resultList.insert({hori_value:"",update_time:"2020/01/01"}, 0	);
	});
}

})();