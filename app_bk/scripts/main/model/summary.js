/*
@hori_name
@hori_count
@hori_last_update
*/
ModuleManager.module("myapp.main.model.summary", function(json){

	//summary全体
	var summary;
	var swipe = ModuleManager.module("myapp.common.swipe");

	var swipeOver = function swipeOver(obj){
		obj.parentNode.removeChild(obj);
	};

	return {

		/*描画処理*/
		/*
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
		createElement: function createElement(){
			summary = document.createElement("div");
			summary.className = "hori_summary"

			var clearFix1 = document.createElement("div");
			clearFix1.className = "clearFix summary_row";
			var name = document.createElement("div");
			name.className = "hori_name";
			var nameText = document.createTextNode(json.hori_name);

			var count = document.createElement("div");
			count.className = "hori_count"
			var countText = document.createTextNode("堀回数 " + json.hori_count + "回");

			name.appendChild(nameText);
			count.appendChild(countText);
			clearFix1.appendChild(name);
			clearFix1.appendChild(count);

			var clearFix2 = document.createElement("div");
			clearFix2.className = "clearFix summary_row";
			var lastUpdate = document.createElement("div");
			lastUpdate.className = "hori_last_update";
			var lastUpdateText = document.createTextNode("最終更新日:" + json.hori_last_update);

			lastUpdate.appendChild(lastUpdateText);
			clearFix2.appendChild(lastUpdate);

			summary.appendChild(clearFix1);
			summary.appendChild(clearFix2);

			var startPointX;
			var startPointY;
			//画面遷移時のイベント
			summary.addEventListener("mousedown", function(e){
				startPointX = e.clientX;
				startPointY = e.clientY;
			});
			summary.addEventListener("mouseup", function(e){
				if(startPointX == e.clientX && startPointY == e.clientY){
					location.href = "../views/summary.html";
				}
			});
			
			// スワイプ処理
			var swipeObj = swipe(summary);
			swipeObj.setOverEvent(function(obj){
				swipeOver(obj);
			});

			return summary;
		},
		getSummary: function getSummary(){
			return summary;
		},
		setSwipeOverEvent: function setSwipeOverEvent(func){
			swipeOver =func;
		},
		getElement: function getElement(){
			return summary;
		}
	}
});