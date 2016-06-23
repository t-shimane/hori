
describe("Summary", function() {
  var summary;

  beforeEach(function() {
	summary = ModuleManager.module("myapp.uicomponent.summary");
  });

  describe("checkParam", function(){
  	it("01", function(){
  		expect(function(){
  			summary({
		      	horie_name: "test",
		      	hori_count: "1",
		      	hori_last_update: "----/--/--"
	    	});
  		}).toThrow(new Error("summary 存在チェックエラー"));
  	});
  	it("02", function(){
  		expect(function(){
  			summary({
		      	hori_name: "test",
		      	horie_count: "1",
		      	hori_last_update: "----/--/--"
	    	});
  		}).toThrow(new Error("summary 存在チェックエラー"));
  	});
  	it("03", function(){
  		expect(function(){
  			summary({
		      	hori_name: "test",
		      	hori_count: "1",
		      	horie_last_update: "----/--/--"
	    	});
  		}).toThrow(new Error("summary 存在チェックエラー"));
  	});
  	it("04", function(){
  		expect(function(){
  			summary({
		      	hori_name: "test",
		      	hori_count: "r",
		      	hori_last_update: "----/--/--"
	    	});
  		}).toThrow(new Error("summary 堀回数 正規表現エラー"));
  	});
  });

  describe("init", function(){
  	var element;

  	beforeEach(function() {
		var uiComp = summary({
	      	hori_name: "test",
	      	hori_count: "1",
	      	hori_last_update: "----/--/--"
	    });

      	element = uiComp.getElement();
  	});

    it("check className hori_summary", function(){
      expect(element.className).toEqual("hori_summary");
    });
    
    it("check className clearFix summary_row", function(){
      expect(element.children[0].className).toEqual("clearFix summary_row");
    });
    
    it("check className hori_name", function(){
      expect(element.children[0].children[0].className).toEqual("hori_name");
    });
    
    it("check text hori_name_text", function(){
      expect(element.children[0].children[0].innerHTML).toEqual("test");
    });
    
    it("check className hori_count", function(){
      expect(element.children[0].children[1].className).toEqual("hori_count");
    });
    
    it("check text hori_count_text", function(){
      expect(element.children[0].children[1].innerHTML).toEqual("堀回数 1回");
    });
    
    it("check className hori_summary", function(){
      expect(element.children[1].className).toEqual("clearFix summary_row");
    });
    
    it("check className hori_last_update", function(){
      expect(element.children[1].children[0].className).toEqual("hori_last_update");
    });
    
    it("check text hori_last_update_text", function(){
      expect(element.children[1].children[0].innerHTML).toEqual("最終更新日:----/--/--");
    });
    
  });

  describe("update", function(){
  	var uiComp;
  	var element;

  	beforeEach(function() {
		uiComp = summary({
	      	hori_name: "test",
	      	hori_count: "1",
	      	hori_last_update: "----/--/--"
	    });
	    uiComp.update({
			hori_name: "test2",
	      	hori_count: "2",
	      	hori_last_update: "----/--/-"
  		});
      	element = uiComp.getElement();
  	});


    it("check className hori_summary", function(){
      expect(element.className).toEqual("hori_summary");
    });
    
    it("check className clearFix summary_row", function(){
      expect(element.children[0].className).toEqual("clearFix summary_row");
    });
    
    it("check className hori_name", function(){
      expect(element.children[0].children[0].className).toEqual("hori_name");
    });
    
    it("check text hori_name_text", function(){
      expect(element.children[0].children[0].innerHTML).toEqual("test2");
    });
    
    it("check className hori_count", function(){
      expect(element.children[0].children[1].className).toEqual("hori_count");
    });
    
    it("check text hori_count_text", function(){
      expect(element.children[0].children[1].innerHTML).toEqual("堀回数 2回");
    });
    
    it("check className hori_summary", function(){
      expect(element.children[1].className).toEqual("clearFix summary_row");
    });
    
    it("check className hori_last_update", function(){
      expect(element.children[1].children[0].className).toEqual("hori_last_update");
    });
    
    it("check text hori_last_update_text", function(){
      expect(element.children[1].children[0].innerHTML).toEqual("最終更新日:----/--/-");
    });
  });
});
