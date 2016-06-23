/**
@params:objに設定するjsonの配列
@obj:listに一覧表示するオブジェクト
*/
ModuleManager.module("myapp.uicomponent.commonlist", function(params, obj){

	var comps = [];
	var parent;

	(function createElement(){
		parent = document.createElement("div");
		for(var i = 0; i < params.length; i++){
			var comp = obj(params[i]);
			var element = comp.getElement();
			parent.appendChild(element);
			comps.push(comp);
		}
	})();

	return {
		getElement: function getElement(index){
			if(index == undefined){
				return parent;
			}
			return parent.children[index];
		},
		getModels: function getModels(){
			return comps;
		},
		getModel: function getModel(index){
			return comps[index];
		},
		each: function each(func){
			for(var i = 0; i < comps.length; i++){
				func(comps[i], i);
			}
		},
		add: function add(param){
			params.push(param);
			var comp = obj(param);
			parent.appendChild(comp.getElement());
			comps.push(comp);
			return comp;
		},
		insert: function insert(param, index){
			params.splice(index, 0, param);
			var comp = obj(param);
			parent.insertBefore(comp.getElement(), parent.children[index]);
			comps.splice(index, 0 ,comp);
			return comp;
		},
		getParams: function getParams(){
			return params;
		},
		removeByIndex: function removeByIndex(index){
			parent.removeChild(parent.children[index]);
			params.splice(index, 1);
			comps.splice(index, 1);
		},
		removeByObject: function removeByObject(obj){
			var index = -1;
			for(var i = 0; i < parent.children.length; i++){
				if(parent.children[i] === obj){
					index = i;
					break;
				}
			}
			if(index === -1){
				throw new Error("removeByObject失敗");
			}
			parent.removeChild(obj);
			params.splice(index, 1);
			comps.splice(index, 1);
		}
	};
});