describe("Result", function(){

	var result;

	beforeEach(function(){
		result = ModuleManager.module("myapp.uicomponent.result");
	});

	describe("init", function(){
		var uiComp;
		beforeEach(function(){
			uiComp = result({
				hori_value: "test",
				update_time: "----/--/--"
			});
		});

		it("01", function(){
			expect(uiComp.getElement().className).toEqual("result");
			expect(uiComp.getElement().children[0].className).toEqual("result_value");
			expect(uiComp.getElement().children[0].value).toEqual("test");
			expect(uiComp.getElement().children[1].className).toEqual("update_time");
			expect(uiComp.getElement().children[1].innerHTML).toEqual("更新日時:----/--/--");
		});
	});

	describe("update", function(){
		var uiComp;
		beforeEach(function(){
			uiComp = result({
				hori_value: "test",
				update_time: "----/--/--"
			});

			uiComp.update({
				hori_value: "test2",
				update_time: "----/--/-"
			});
		});

		it("01", function(){
			expect(uiComp.getElement().className).toEqual("result");
			expect(uiComp.getElement().children[0].className).toEqual("result_value");
			expect(uiComp.getElement().children[0].value).toEqual("test2");
			expect(uiComp.getElement().children[1].className).toEqual("update_time");
			expect(uiComp.getElement().children[1].innerHTML).toEqual("更新日時:----/--/-");
			expect(uiComp.getParam().hori_value).toEqual("test2");
		});
	});


	describe("remove", function(){
		var uiComp;
		beforeEach(function(){
			var div = document.createElement("div");
			uiComp = result({
				hori_value: "test",
				update_time: "----/--/--"
			});
			div.appendChild(uiComp.getElement());
		});

		it("01", function(){
			uiComp.remove();
			expect(uiComp.getElement()).toEqual(undefined);
			expect(uiComp.getParam()).toEqual(undefined);
		});
	});
});