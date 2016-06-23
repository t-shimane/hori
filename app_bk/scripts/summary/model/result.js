/**
{
	@hori_value
	@update_time
}
*/
ModuleManager.module("myapp.summary.model.result", function(param){

	var result;
	var swipe = ModuleManager.module("myapp.common.swipe");

	return {
		/**
		下記domを描画する
		<div class="result">
			<input type="text" value="大鯨" class="result_value">
			<div class="update_time">更新日:2016/01/01</div>
		</div>
		*/
		createElement: function createElement(){
			result = document.createElement("div");
			result.className = "result";

			var inputText = document.createElement("input");
			inputText.value = param.hori_value;
			inputText.className = "result_value";
			result.appendChild(inputText);

			var updateTime = document.createElement("div");
			updateTime.className = "update_time";
			var updateTimeText = document.createTextNode("更新日時:" + param.update_time);
			updateTime.appendChild(updateTimeText);
			result.appendChild(updateTime);
			
			var swipeObj = swipe(result);
			swipeObj.setOverEvent(function(result){
				result.parentNode.removeChild(result);
			});
			return result;
		}
	};
});