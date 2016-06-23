(function(){

	var storageManager = ModuleManager.module("myapp.common.storagemanager");
	var dbManager = ModuleManager.module("myapp.service.dbmanager");
	var dateManager = ModuleManager.module("myapp.common.datemanager");

	ModuleManager.module("myapp.service.summarydataservice", (function(){

		var DATA_KEY = "summaryList";

		return {
			getSummaryList: function getSummaryList(callback){
				var query = "";
				query += "SELECT ";
				query += "    s.id ";
				query += "  , s.name as hori_name";
				query += "  , s.lastUpdateTime as hori_last_update";
				query += "  , count(r.id) as hori_count ";
				query += "FROM ";
				query += "    summary as s ";
				query += "LEFT OUTER JOIN ";
				query += "    result as r ";
				query += "ON ";
				query += "    s.id = r.id ";
				query += "GROUP BY ";
				query += "    s.id, s.name, s.lastUpdateTime ";
				query += "ORDER BY ";
				query += "   lastUpdateTime DESC";

				manager = dbManager();
				manager.read(query, callback);
			},
			getSummary: function getSummary(id, callBack){
				var query = "";
				query += "SELECT ";
				query += "    s.id ";
				query += "  , s.name as hori_name";
				query += "  , s.lastUpdateTime as hori_last_update";
				query += "  , count(r.id) as hori_count ";
				query += "FROM ";
				query += "    summary as s ";
				query += "INNER JOIN ";
				query += "    result as r ";
				query += "ON ";
				query += "    s.id = r.id ";
				query += "GROUP BY ";
				query += "    s.id, s.name, s.lastUpdateTime ";
				query += "ORDER BY ";
				query += "   lastUpdateTime DESC";

				manager = dbManager();
				manager.read(query, callBack);
			},
			createSummary: function createSummary(param, callBack){
				manager = dbManager();
				manager.commonExecute(function(tr){

					var query = "";
					query += "SELECT ";
					query += "    COALESCE(max(id), 0) as maxId ";
					query += "FROM ";
					query += "    summary ";

					console.log(query);

					tr.executeSql(query,[],function success(tr, result){
						console.log(result.rows.item(0).maxId);

						var insertQuery = "";
						insertQuery += "INSERT INTO summary( ";
						insertQuery += "    id, name, lastUpdateTime ";
						insertQuery += ") ";
						insertQuery += "values ( ";
						insertQuery += "    ?, ?, ? ";
						insertQuery += ") ";

						var newId = result.rows.item(0).maxId + 1;

						var parameters = [];
						if(param == undefined){
							parameters.push(newId);
							parameters.push("新規");
							parameters.push("----/--/--");
							param = {
								id: newId,
								hori_name:"新規",
								hori_count:"0",
								hori_last_update:"----/--/--"
							};
						}else{
							param.id = newId;
							parameters.push(newId);
							parameters.push(param.hori_name);
							parameters.push(param.hori_last_update);
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
			updateSummaryList: function updateSummaryList(id, horo){
				storageManager.saveObject(DATA_KEY, dataList);
			},
			updateSummary: function updateSummary(id, name, lastUpdate){
				var query = "";
				query += "UPDATE ";
				query += "    summary ";
				query += "set ";
				query += "    name = ? ";
				query += "  , lastUpdateTime = ? ";
				query += "WHERE ";
				query += "    id = ? ";

				manager = dbManager();
				manager.addParameter(name);
				if(lastUpdate){
					manager.addParameter(lastUpdate);
				}else{
					manager.addParameter(dateManager.getDate());
				}
				manager.addParameter(id);
				manager.execute(query);
			},
			deleteSummary: function deleteSummary(id){

				manager = dbManager();
				manager.commonExecute(function(tr){
					var query = "";
					query += "DELETE FROM result ";
					query += "WHERE id = ? ";

					tr.executeSql(query, [id], function(tr, result){

						var query = "";
						query += "DELETE FROM summary ";
						query += "WHERE id = ? ";
						tr.executeSql(query, [id], function(){

						});
					});
				});
			}
		};
	})());

})();