(function(){

	ModuleManager.module("myapp.service.dbMigrate", (function(){

		var databaseName = "horiDataBase";
		var latestVersion = "1.0";
		var maxSize = 1024 * 1024;

		var dict = {
			"": {
				nextVersion: "1.0",
				update: function update(tr){
					var query1 = "";
					query1 += "CREATE TABLE summary (";
					query1 += "    id int, ";
					query1 += "    name text, ";
					query1 += "    lastUpdateTime text, ";
					query1 += "    primary key(id) ";
					query1 += ")";
					tr.executeSql(query1);

					var query2 = "";
					query2 += "CREATE TABLE result (";
					query2 += "    id int, ";
					query2 += "    resultId int, ";
					query2 += "    value text, ";
					query2 += "    updateTime, ";
					query2 += "    primary key(id, resultId)";
					query2 += ")";
					tr.executeSql(query2);
				}
			},
			"1.0": {
				nextVersion: "1.1",
				update: function update(tr){

				}
			}
		};

		return{
			migrate: function migrate(){
				var db = openDatabase(databaseName, "", databaseName, maxSize);
				if(db.version !== latestVersion){
					db.changeVersion(db.version, dict[db.version].nextVersion, function(tr){
						dict[db.version].update(tr);
					}, function fail(error){
						console.log("db change version error");
						console.log(error);
					}, function succese(){
						migrate();
					})
				}
			}
		};
	})());

})();