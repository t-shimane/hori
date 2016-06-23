(function(){

	var swipe = ModuleManager.module("myapp.common.swipe");

	// 定数
	var countReg = /^[0-9]+$/;

	/*
	@hori_name
	@hori_count
	@hori_last_update
	*/
	ModuleManager.module("myapp.uicomponent.summary", function(json){

		var summary; //summary全体
		var horiName; //名称
		var horiCount; //堀回数
		var horiLastUpdate; //最終更新日
		var swipeObj;

		// summaryのクリックイベント標準処理
		var summaryClick = function summaryClick(obj, json){
			location.href = "../views/details.html";
		};

		// スワイプオーバーイベント標準処理
		var swipeOver = function swipeOver(obj, json){
			obj.style["animation"] = "removeStyle 1s linear 0s 1 normal";
			setTimeout(function(){
				obj.parentNode.removeChild(obj);
			}, 950);
		};

		//paramチェック
		function checkParam(param){
			// 存在チェック
			if(param.hori_name == undefined || param.hori_count == undefined || param.hori_last_update == undefined){
				throw new Error("summary 存在チェックエラー");
			}

			// 正当性
			if(!countReg.test(param.hori_count)){
				throw new Error("summary 堀回数 正規表現エラー");	
			}
		};
		checkParam(json);

		/**
		描画処理
		下記のdomを出力する
		<div class="hori_summary">
			<div class="clearFix summary_row">
				<div class="hori_name">
					２−５　大鯨堀
				</div>
				<div class="hori_count">
					堀回数 1000回
				</div>
			</div>
			<div class="clearFix summary_row">
				<div class="hori_last_update">
					最終更新日：2016/06/01
				</div>
			</div>
		</div>
		*/
		//domの構築
		(function createElement(){
			summary = document.createElement("div");
			summary.className = "hori_summary"

			var clearFix1 = document.createElement("div");
			clearFix1.className = "clearFix summary_row";
			horiName = document.createElement("div");
			horiName.className = "hori_name";
			var horiNameText = document.createTextNode(json.hori_name);

			horiCount = document.createElement("div");
			horiCount.className = "hori_count"
			var horiCountText = document.createTextNode("堀回数 " + json.hori_count + "回");

			horiName.appendChild(horiNameText);
			horiCount.appendChild(horiCountText);
			clearFix1.appendChild(horiName);
			clearFix1.appendChild(horiCount);

			var clearFix2 = document.createElement("div");
			clearFix2.className = "clearFix summary_row";
			horiLastUpdate = document.createElement("div");
			horiLastUpdate.className = "hori_last_update";
			var horiLastUpdateText = document.createTextNode("最終更新日:" + json.hori_last_update);

			horiLastUpdate.appendChild(horiLastUpdateText);
			clearFix2.appendChild(horiLastUpdate);

			summary.appendChild(clearFix1);
			summary.appendChild(clearFix2);

			// スワイプ処理を実装
			swipeObj = swipe(summary);
		})();

		//標準のイベントの設定
		(function setEvent(){
			var startPointX;
			var startPointY;
			//画面遷移時のイベント スワイプと区別するために座標の変更がないときのみ発火する
			summary.addEventListener("mousedown", function(e){
				startPointX = e.clientX;
				startPointY = e.clientY;
			});
			summary.addEventListener("mouseup", function(e){
				if(startPointX == e.clientX && startPointY == e.clientY){
					summaryClick(summary, json);
				}
			});
			
			// スワイプオーバー時の処理
			swipeObj.setOverEvent(function(obj){
				swipeOver(obj, json);
			});
		})();

		return {
			getElement: function getElement(){
				return summary;
			},
			update: function update(updatedParam){
				//変更のあった値のみ修正する or paramの値を再設定する
				checkParam(updatedParam);

				if(json.hori_name !== updatedParam.hori_name){
					horiName.innerHTML = updatedParam.hori_name;
				}
				if(json.hori_count !== updatedParam.hori_count){
					horiCount.innerHTML = "堀回数 " + updatedParam.hori_count + "回";
				}
				if(json.hori_last_update !== updatedParam.hori_last_update){
					horiLastUpdate.innerHTML = "最終更新日:" + updatedParam.hori_last_update;
				}
				json = updatedParam;
			},
			remove: function remove(){
				summary.parentNode.removeChild(summary);
			},
			getParam: function getParam(){
				return json;
			},
			setSummaryClickEvent: function setSummaryClickEvent(func){
				summaryClick = func;
			},
			setSwipeOverEvent: function setSwipeOverEvent(func){
				swipeOver = func;
			}
		}
	});
})();
