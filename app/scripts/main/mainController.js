(function(){

	window.onload = function(){

		var service = ModuleManager.module("myapp.service.summarydataservice");
		var summary = ModuleManager.module("myapp.uicomponent.summary");
		var commonList = ModuleManager.module("myapp.uicomponent.commonlist");
		var swipe = ModuleManager.module("myapp.common.swipe");
		var transfer = ModuleManager.module("myapp.common.transferparameter");

		var summaryList;

		//スワイプオーバー時の処理
		function swipeOver(obj, param){
			obj.style["animation"] = "removeStyle 1s linear 0s 1 normal";
			setTimeout(function(){
				summaryList.removeByObject(obj);
				service.deleteSummary(param.id);
			}, 950);
		}

		service.getSummaryList(function(result){
			var params = [];
			for(var i=0; i < result.rows.length; i++){
				params.push(result.rows.item(i));
			}

			var parent = document.getElementById("summaryList");

			summaryList = commonList(params, summary);
			parent.appendChild(summaryList.getElement());

			summaryList.each(function(comp, index){
				//swipeOverイベントの設定
				comp.setSwipeOverEvent(swipeOver);
				//クリックイベントの設定
				comp.setSummaryClickEvent(function(obj, param){
					transfer.sendParam("summary", param);
					location.href = "../views/details.html";
				});
			});
		});

		//新規登録ボタンの動作
		document.getElementById("add").addEventListener("click", function(){
			var param = {
				hori_name: "新規",
				hori_count: "0",
				hori_last_update: "----/--/--"
			};
			service.createSummary(param, function(result, resultParam){
				var newComp = summaryList.insert(resultParam, 0);
				newComp.setSwipeOverEvent(swipeOver);
				//クリックイベントの設定
				newComp.setSummaryClickEvent(function(obj, param){
					transfer.sendParam("summary", param);
					location.href = "../views/details.html";
				});
			});
		});

		//戻るボタンの動作
		document.getElementById("back").addEventListener("click", function(){
			location.href = "index.html";
		});

		//遷移時の処理(画面更新時も発火している)
		window.onbeforeunload = function(){
			//service.updateSummaryList(summaryList.getParams());
			//storageManager.saveObject("summaryList", summaryList.getParams());
		}
	}

})();