describe("transferParameter", function(){
	var obj;
	beforeEach(function(){
		obj = ModuleManager.module("myapp.common.transferparameter");
	});

	it("01", function(){
		obj.sendParam("test", "paramter");
		expect(obj.getParam("test")).toEqual("paramter");
		expect(obj.getParam("test")).toEqual(null);
	});

	it("02", function(){
		obj.sendParam("test2", {
			hori_name:"test",
			test_value:"value"
		});
		expect(obj.getParam("test2").hori_name).toEqual("test");
		expect(obj.getParam("test2")).toEqual(null);
	});

});