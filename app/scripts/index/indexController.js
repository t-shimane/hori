
(function(){

	window.onload = function(){
		var proc = ModuleManager.module("myapp.index.indexModel")();
		var dbMigrate = ModuleManager.module("myapp.service.dbMigrate");

		dbMigrate.migrate();

		document.getElementById("startButton").addEventListener("click", proc.toMainView);
	}
})();