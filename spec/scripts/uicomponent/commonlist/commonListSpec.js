describe("CommonList", function(){
	var commonList;
	var summary;

	beforeEach(function(){
		commonList = ModuleManager.module("myapp.uicomponent.commonlist");
		summary = ModuleManager.module("myapp.uicomponent.summary");
	});

	describe("init", function(){
		var uiCompo;
		beforeEach(function(){
			uiCompo = commonList([{
				hori_name:"test",
				hori_count:"1",
				hori_last_update:"----/--/--"
			},{
				hori_name:"test2",
				hori_count:"12",
				hori_last_update:"----/--/--"
			}], summary);
		});

		it("01", function(){
			expect(uiCompo.getElement().children.length).toEqual(2);
		});
		it("getElement-02", function(){
			expect(uiCompo.getElement(0).className).toEqual("hori_summary");
		});
		it("getModels", function(){
			expect(uiCompo.getModels().length).toEqual(2);
		});
		it("getModel", function(){
			expect(uiCompo.getModel(0).getParam().hori_name).toEqual("test");
		});
	});

	describe("add", function(){
		var uiCompo;
		beforeEach(function(){
			uiCompo = commonList([{
				hori_name:"test",
				hori_count:"1",
				hori_last_update:"----/--/--"
			},{
				hori_name:"test2",
				hori_count:"12",
				hori_last_update:"----/--/--"
			}], summary);

			uiCompo.add({
				hori_name:"test3",
				hori_count:"123",
				hori_last_update:"----/--/--"
			});
		});

		it("01", function(){
			expect(uiCompo.getElement().children.length).toEqual(3);
		});
		it("getElement-02", function(){
			expect(uiCompo.getElement(2).className).toEqual("hori_summary");
		});
		it("getModels", function(){
			expect(uiCompo.getModels().length).toEqual(3);
		});
		it("getModel", function(){
			expect(uiCompo.getModel(2).getParam().hori_name).toEqual("test3");
		});
	});

	describe("insert", function(){
		var uiCompo;
		beforeEach(function(){
			uiCompo = commonList([{
				hori_name:"test",
				hori_count:"1",
				hori_last_update:"----/--/--"
			},{
				hori_name:"test2",
				hori_count:"12",
				hori_last_update:"----/--/--"
			}], summary);	
		});

		it("01", function(){
			uiCompo.insert({
				hori_name:"test3",
				hori_count:"123",
				hori_last_update:"----/--/--"
			},0);
			expect(uiCompo.getElement().children.length).toEqual(3);
			expect(uiCompo.getElement(0).className).toEqual("hori_summary");
			expect(uiCompo.getModels().length).toEqual(3);
			expect(uiCompo.getModel(0).getParam().hori_name).toEqual("test3");
		});
	});

	describe("remove", function(){
		var uiCompo;
		beforeEach(function(){
			uiCompo = commonList([{
				hori_name:"test",
				hori_count:"1",
				hori_last_update:"----/--/--"
			},{
				hori_name:"test2",
				hori_count:"12",
				hori_last_update:"----/--/--"
			}], summary);	
		});

		it("01", function(){
			uiCompo.removeByIndex(0)
			expect(uiCompo.getElement().children.length).toEqual(1);
			expect(uiCompo.getElement(0).className).toEqual("hori_summary");
			expect(uiCompo.getModels().length).toEqual(1);
			expect(uiCompo.getModel(0).getParam().hori_name).toEqual("test2");
		});

		it("02", function(){
			var obj = uiCompo.getElement(1);
			uiCompo.removeByObject(obj);
			expect(uiCompo.getElement().children.length).toEqual(1);
			expect(uiCompo.getElement(0).className).toEqual("hori_summary");
			expect(uiCompo.getModels().length).toEqual(1);
			expect(uiCompo.getModel(0).getParam().hori_name).toEqual("test");
		});
	});
});