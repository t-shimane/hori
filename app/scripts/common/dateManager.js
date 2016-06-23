(function(){

	var dateManager = (function(){
		return {
			getDate: function getDate(){
				var myd = new Date();
				var year = myd.getFullYear();
				var month = ("0" + (myd.getMonth() + 1)).slice(-2);
				var day = ("0" + myd.getDate()).slice(-2);
				var hours = ("0" + myd.getHours()).slice(-2);
				var minutes = ("0" + myd.getMinutes()).slice(-2);
				var seconds = ("0" + myd.getSeconds()).slice(-2);
				return year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
			}
		};
	})();

	ModuleManager.module("myapp.common.datemanager", dateManager);

})();