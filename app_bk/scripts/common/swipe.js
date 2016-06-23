/**
初期設定値を設定
*/
ModuleManager.module("myapp.common.swipe", function(obj){

	var startPointX;
	var startPointY;
	var movedPointX;
	var movedPointY;

	var isStart;

	var preMargin = obj.style["margin-left"];

	var overEvent = function overEvent(obj){};

	function start(e){
		startPointX = e.clientX;
		startPointY = e.clientY;
		isStart = true;
	}

	function move(e){
		if(!isStart){
			return;
		}

		movedPointX = e.clientX;
		movedPointY = e.clientY;

		if(movedPointX > startPointX){
			var offSet = movedPointX - startPointX;
			obj.style["margin-left"] = offSet + "px";
		}
	}

	function end(e){
		if(!isStart){
			return;
		}
		var offSet = movedPointX - startPointX;

		startPointX = 0;
		startPointY = 0;
		movedPointX = 0;
		movedPointY = 0;
		isStart = false;

		if(obj.offsetWidth / 4 * 3 < offSet){
			overEvent(obj);
			return;
		}
		obj.style["margin-left"] = preMargin;
	}

	obj.addEventListener("mousedown", start);
	obj.addEventListener("mousemove", move);
	obj.addEventListener("mouseup", end);
	obj.addEventListener("mouseleave", end);

	return {
		setOverEvent: function setOverEvent(func){
			overEvent = func;
		}
	};

});
