(function(){

	window.onload = function (){

		var storageManager = ModuleManager.module("myapp.common.storagemanager");
		var commonList = ModuleManager.module("myapp.uicomponent.commonlist");
		var swipe = ModuleManager.module("myapp.common.swipe");
		var result = ModuleManager.module("myapp.uicomponent.result");
		var transfer = ModuleManager.module("myapp.common.transferparameter");
		var service = ModuleManager.module("myapp.service.resultdataservice");
		var summaryService = ModuleManager.module("myapp.service.summarydataservice");
		var dateManager = ModuleManager.module("myapp.common.datemanager");

		//前画面からのパラメータを取得
		var summaryData = transfer.getParam("summary");
		if(summaryData == null){
			location.href = "main.html";
		}

		//値を設定
		document.getElementById("horiName").value = summaryData.hori_name;
		document.getElementById("horiCount").innerHTML = "堀回数 " + summaryData.hori_count + "回";

		// スワイプオーバー時のイベント
		function swipeOver(obj, param){
			obj.style["animation"] = "removeStyle 1s linear 0s 1 normal";
			setTimeout(function(){
				resultList.removeByObject(obj);
				summaryData.hori_count--;
				document.getElementById("horiCount").innerHTML = "堀回数 " + summaryData.hori_count + "回";
				service.deleteResult(param.id, param.resultId);
			}, 950);
		}

		// 更新時のイベント
		function updateResult(obj, param){
			service.updateResult(param.id, param.resultId, obj.value);
			summaryService.updateSummary(summaryData.id, document.getElementById("horiName").value);
		}

		//堀名称変更時イベント
		document.getElementById("horiName").addEventListener("change", function(obj){
			summaryService.updateSummary(summaryData.id, document.getElementById("horiName").value);
		});

		//resultListの取得
		var resultList
		service.getResultList(summaryData.id, function(resultSet){
			var params = [];
			for(var i = 0; i < resultSet.rows.length; i++){
				params.push(resultSet.rows.item(i));
			}
			//画面に反映
			var parent = document.getElementById("resultList");
			resultList = commonList(params, result);
			parent.appendChild(resultList.getElement());

			resultList.each(function(comp, index){
				//スワイプオーバー時のイベント設定
				comp.setSwipeOverEvent(swipeOver);
				comp.setChangeValueEvent(updateResult);
			});
		});

		//新規登録ボタンの動作
		document.getElementById("add").addEventListener("click", function(){
			var param = {
				id: summaryData.id,
				hori_value:"",
				update_time:dateManager.getDate()
			};
			service.createResult(summaryData.id, param, function(result, resultParam){
				var newComp = resultList.insert(resultParam, 0);
				newComp.setSwipeOverEvent(swipeOver);
				newComp.setChangeValueEvent(updateResult);
				summaryData.hori_count++;
				document.getElementById("horiCount").innerHTML = "堀回数 " + summaryData.hori_count + "回";
				summaryService.updateSummary(summaryData.id, document.getElementById("horiName").value);
			});
		});

		//戻るボタンの動作
		document.getElementById("back").addEventListener("click", function(){
			location.href = "main.html";
		});
	}

})();