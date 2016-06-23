ModuleManager.module("myapp.index.proc", function index(){

	var MAIN_VIEW_URL = "main.html"

	return {

		//メイン画面遷移処理
		toMainView: function toMainView(){
			window.location.href = MAIN_VIEW_URL;
		}
	};
});