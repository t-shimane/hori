window.onload = function(){
	var proc = ModuleManager.module("myapp.index.proc")();

	document.getElementById("startButton").addEventListener("click", proc.toMainView);
}