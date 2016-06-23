/**
@params:objに設定するjsonの配列
@obj:listに一覧表示するオブジェクト
*/
ModuleManager.module("myapp.common.model.commonList", function(params, obj){

	//dom要素の配列を持つ
	var elements = [];
	var models = [];
	var parent;

	return {
		createElement: function createElement(){
			parent = document.createElement("div");
			for(var i = 0; i < params.length; i++){
				var model = obj(params[i]);
				var element = model.createElement();
				parent.appendChild(element);
				models.push(model);
			}
			return parent;
		},
		getElement: function getElement(index){
			return parent.children[index];
		},
		getModel: function getModel(index){
			return models[index];
		},
		each: function each(func){
			for(var i = 0; i < models.length; i++){
				func(models[i], i);
			}
		},
		add: function add(param){
			params.push(param);
			var model = obj(param);
			var element = model.createElement();
			parent.appendChild(element)
			models.push(model);
			return element;
		},
		insert: function insert(param, index){
			params.splice(index, 0, param);
			var model = obj(param);
			var element = model.createElement();
			parent.insertBefore(element, parent.children[index]);
			models.splice(index, 0 ,model);
			return model;
		},
		getParams: function getParams(){
			return params;
		},
		removeElement: function removeElement(index){
			parent.removeChild(parent.children[index]);
			params.splice(index, 1);
			models.splice(index, 1);
		},
		removeObject: function removeObject(obj){
			var index = -1;
			for(var i = 0; i < parent.children.length; i++){
				if(parent.children[i] === obj){
					index = i;
					break;
				}
			}
			if(index === -1){
				throw new Error("removeObject失敗");
			}
			parent.removeChild(obj);
			params.splice(index, 1);
			models.splice(index, 1);
		}
	};
});