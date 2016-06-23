(function(){

	var transferParameter = (function(){

		//機能の利用が可能かチェック
		if(("sessionStorage" in window) && (window.sessionStorage !== null)){

		}else{
			throw new Error("sessionStorage not useable");
		}

		var prefix = "transferparameter_";

		return {
			sendParam: function sendParam(key, value){
				sessionStorage.setItem(key, JSON.stringify(value));
			},
			getParam: function getParam(key){
				var returnValue = JSON.parse(sessionStorage.getItem(key));
				sessionStorage.removeItem(key);
				return returnValue;
			}
		};
	})();

	ModuleManager.module("myapp.common.transferparameter", transferParameter);

})();