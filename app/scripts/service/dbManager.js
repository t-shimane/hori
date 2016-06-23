(function(){

	ModuleManager.module("myapp.service.dbmanager", function(){

		var databaseName = "horiDataBase";
		var maxSize = 1024 * 1024;

		function getDB(){
			return openDatabase(databaseName, "", databaseName, maxSize);
		}

		var parameters = [];

		return {
			addParameter: function addParameter(param){
				parameters.push(param);
			},
			read: function read(query, callBack){
				var db = getDB();
				db.transaction(function(tr){
					tr.executeSql(query, parameters, function succese(tr, result){
						callBack(result);
					}, function fail(tr, error){
						console.log(query);
						console.log(error);
						throw error;
					});
				});
			},
			execute: function execute(query){
				var db = getDB();
				console.log(query);
				db.transaction(function(tr){
					tr.executeSql(query, parameters, function succese(tr, result){

					}, function fail(tr, error){
						console.log(query);
						console.log(error);
						throw error;
					});
				});
			},
			insert: function insert(query, resultId, parameter){
				var db = getDB();
				db.transaction(function(tr){
					tr.executeSql(query, parameters, function succese(tr, rs){
						resultId = rs.insertId;
					}, function fail(tr, error){
						console.log(query);
						console.log(error);
						throw error;
					});
				});
			},
			commonExecute: function commonExecute(func){
				var db = getDB();
				db.transaction(func);
			}
		}
	});

})();