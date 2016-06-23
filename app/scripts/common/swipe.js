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

	function getPointX(e){
		if(e.changedTouches){
			return e.changedTouches[0].pageX;
		}else{
			return e.clientX;
		}
	}

	function getPointY(e){
		if(e.changedTouches){
			return e.changedTouches[0].pageY;
		}else{
			return e.clientY;
		}
	}

	function start(e){
		startPointX = getPointX(e);
		startPointY = getPointY(e);
		isStart = true;
	}

	function move(e){
		if(!isStart){
			return;
		}

		movedPointX = getPointX(e);
		movedPointY = getPointY(e);

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
	if(window.TouchEvent){
		obj.addEventListener("touchstart", start);
		obj.addEventListener("touchmove", move);
		obj.addEventListener("touchend", end);
	}

	return {
		setOverEvent: function setOverEvent(func){
			overEvent = func;
		}
	};

});
