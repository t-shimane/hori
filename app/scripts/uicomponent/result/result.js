
(function(){

	var swipe = ModuleManager.module("myapp.common.swipe");

	/**
	{
		@hori_value
		@update_time
	}
	*/
	ModuleManager.module("myapp.uicomponent.result", function(param){

		var result;
		var resultValue;
		var updateTime;
		var swipeObj;

		// 値変更時標準イベント
		var changeValue = function changeValue(obj, param){
			param.hori_value = obj.value;
		};

		//スワイプオーバー標準イベント
		var swipeOver = function swipeOver(obj, param){
			obj.parentNode.removeChild(obj);
		}

		function checkParam(p){
			if(p.update_time == undefined){
				throw new Error("存在チェックエラー");
			}
		}
		checkParam(param);

		/**
		下記domを描画する
		<div class="result">
			<input type="text" value="大鯨" class="result_value">
			<div class="update_time">更新日:2016/01/01</div>
		</div>
		*/
		(function createElement(){
			result = document.createElement("div");
			result.className = "result";

			resultValue = document.createElement("input");
			resultValue.value = param.hori_value;
			resultValue.className = "result_value";
			result.appendChild(resultValue);

			updateTime = document.createElement("div");
			updateTime.className = "update_time";
			var updateTimeText = document.createTextNode("更新日時:" + param.update_time);
			updateTime.appendChild(updateTimeText);
			result.appendChild(updateTime);
			
			//スワイプ処理を実装
			swipeObj = swipe(result);
		})();

		//イベント設定
		(function setEvent(){
			result.addEventListener("click", function(obj){
				resultValue.focus();
			});

			resultValue.addEventListener("change", function(obj){
				param.hori_value = resultValue.value;
				changeValue(resultValue, param)
			});

			swipeObj.setOverEvent(function(obj){
				swipeOver(obj, param);
			});
		})();

		return {
			getElement: function getElement(){
				return result;
			},
			update: function update(updateParam){
				checkParam(updateParam);
				if(param.hori_value !== updateParam.hori_value){
					resultValue.value = updateParam.hori_value;
				}
				if(param.update_time !== updateParam.update_time){
					updateTime.innerHTML = "更新日時:" + updateParam.update_time;
				}
				param = updateParam;
			},
			remove: function remove(){
				result.parentNode.removeChild(result);
				param = undefined;
				result = undefined;
			},
			getParam: function getParam(){
				return param;
			},
			setSwipeOverEvent: function setSwipeOverEvent(func){
				swipeOver = func;
			},
			setChangeValueEvent: function setChangeValueEvent(func){
				changeValue = func;
			}
		};
	});
})();