(function(){

window.onload = function(){
	var commonList = ModuleManager.module("myapp.common.model.commonList");
	var summary = ModuleManager.module("myapp.main.model.summary");
	var swipe = ModuleManager.module("myapp.common.swipe");
	var storageManager = ModuleManager.module("myapp.common.storagemanager");

	var params = [];
	if(storageManager.exists("summaryList")){
		params = storageManager.loadObject("summaryList");
	}else{
		params.push({hori_name:"2-5大鯨堀",hori_count:"3",hori_last_update:"2016/01/01"});
		params.push({hori_name:"2-3周回(AC)",hori_count:"10",hori_last_update:"2014/12/31"});
		params.push({hori_name:"2-3追撃周回(AC)",hori_count:"100",hori_last_update:"1999/01/01"});
		params.push({hori_name:"test",hori_count:"1",hori_last_update:"2020/01/01"});
	}

	var parent = document.getElementById("summaryList");

	var summaryList = commonList(params, summary);
	parent.appendChild(summaryList.createElement());

	//swipeOverイベントの設定
	summaryList.each(function(model, index){
		model.setSwipeOverEvent(function(obj){
			summaryList.removeObject(obj);
		});
	});

	var counter = 1;

	//新規登録ボタンの動作
	document.getElementById("add").addEventListener("click", function(){
		counter++;
		var newModel = summaryList.insert({hori_name:"新規",hori_count:counter,hori_last_update:Date.now()}, 0);
		newModel.setSwipeOverEvent(function(obj){
			summaryList.removeObject(obj);
		});
	});

	//遷移時の処理
	window.onbeforeunload = function(){
		storageManager.saveObject("summaryList", summaryList.getParams());
	}
}

})();