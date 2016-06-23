describe("resutlDataService", function(){
	var service;
	var dbManagerMoc;

	beforeEach(function(){
		service = ModuleManager.module("myapp.service.resultdataservice");
		dbManagerMoc = ModuleManager.module("myapp.service.dbmanager");
	});

	describe("getResultList", function(){

		beforeEach(function(){
			var data = [
				{
					id: "1",
					resultId: "2",
					hori_value: "瑞鶴",
					update_time: "2016/01/01"
				},
				{
					id: "1",
					resultId: "3",
					hori_value: "瑞鶴2",
					update_time: "2016/01/02"
				}
			]
			var result = {
				rows: {
					length:2,
					item: function item(index){
						return data[index];
					}
				}
			}
			dbManagerMoc = dbManagerMoc();
			dbManagerMoc.resultSet(result);
		});

		it("01", function(){
			var result01;
			service.getResultList("1", function(datas){
				result01 = datas;
			});
			expect(result01.rows.item(0).hori_value).toEqual("瑞鶴");
		});

	});



});