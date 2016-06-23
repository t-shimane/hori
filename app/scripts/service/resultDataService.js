(function(){

	var dbManager = ModuleManager.module("myapp.service.dbmanager");
	var dateManager = ModuleManager.module("myapp.common.datemanager");

	var resultDataService = (function(){

		return {
			getResultList: function getResultList(summaryId, callBack){
				var query = "";
				query += "SELECT ";
				query += "    id ";
				query += "  , resultId ";
				query += "  , value as hori_value ";
				query += "  , updateTime as update_time ";
				query += "FROM ";
				query += "    result ";
				query += "WHERE ";
				query += "    id = ? ";
				query += "ORDER BY ";
				query += "    resultId desc ";

				manager = dbManager();
				manager.addParameter(summaryId);
				manager.read(query, callBack);
			},
			createResult: function createResult(summaryId, param, callBack){
				manager = dbManager();
				manager.commonExecute(function(tr){

					var query = "";
					query += "SELECT ";
					query += "    COALESCE(max(resultId), 0) as maxId ";
					query += "FROM ";
					query += "    result ";
					query += "WHERE ";
					query += "    id = ? ";

					tr.executeSql(query,[summaryId],function success(tr, result){

						var insertQuery = "";
						insertQuery += "INSERT INTO result( ";
						insertQuery += "    id, resultId, value, updateTime ";
						insertQuery += ") ";
						insertQuery += "values ( ";
						insertQuery += "    ?, ?, ? , ?";
						insertQuery += ") ";

						var newId = result.rows.item(0).maxId + 1;

						var parameters = [];
						if(param == undefined){
							parameters.push(summaryId);
							parameters.push(newId);
							parameters.push("");
							var updateTime = dateManager.getDate();
							parameters.push(updateTime);
							param = {
								id: summaryId,
								resultId: newId,
								hori_value:"",
								update_time:updateTime
							};
						}else{
							param.resultId = newId;
							parameters.push(summaryId);
							parameters.push(newId);
							parameters.push(param.hori_value);
							parameters.push(param.update_time);
						}
						tr.executeSql(insertQuery, parameters, function success(tr, result){
							callBack(result, param);
						}, function fail(tr, error){
							console.log(error);
							throw error;
						});
					}, function fail(tr, error){
						console.log(error);
						throw error;
					});
				});
			},
			updateResult: function updateResult(summaryId, resultId, hori_value, callBack){
				var query = "";
				query += "UPDATE ";
				query += "    result ";
				query += "set ";
				query += "    value = ? ";
				query += "  , updateTime = ? ";
				query += "WHERE ";
				query += "    id = ? AND resultId = ? ";

				manager = dbManager();
				manager.addParameter(hori_value);
				manager.addParameter(dateManager.getDate());
				manager.addParameter(summaryId);
				manager.addParameter(resultId);
				manager.execute(query);
			},
			deleteResult: function deleteResult(summaryId, resultId){
				var query = "";
				query += "DELETE FROM result ";
				query += "WHERE id = ? AND resultId = ?";

				manager = dbManager();
				manager.addParameter(summaryId);
				manager.addParameter(resultId);
				manager.execute(query);
			}
		};
	})();

	ModuleManager.module("myapp.service.resultdataservice",resultDataService);

})();