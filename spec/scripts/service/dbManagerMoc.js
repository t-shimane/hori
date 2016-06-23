(function(){

	var result;
	ModuleManager.module("myapp.service.dbmanager", function(){

		var databaseName = "horiDataBase";
		var maxSize = 1024 * 1024;

		function getDB(){
			return openDatabase(databaseName, "", databaseName, maxSize);
		}

		var parameters = [];

		var tr = {
			executeSql: function(query, params, successFunc, failFunc){
				successFunc(tr, result);
			}
		};

		return {
			resultSet: function resultSet(rs){
				result = rs;
			},
			addParameter: function addParameter(param){
				parameters.push(param);
			},
			read: function read(query, callBack){
				callBack(result);
			},
			execute: function execute(query){
			},
			insert: function insert(query, resultId, parameter){
				resultId = result;
			},
			commonExecute: function commonExecute(func){
				func(tr);
			}
		}
	});

})();