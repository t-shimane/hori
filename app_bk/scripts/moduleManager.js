var ModuleManager = (function(){

	//モジュール格納用
	var app = {};
	//チェック用正規表現
	var reg = /^[0-9a-zA-Z]+$/

	// 非公開メソッド
	// モジュール生成用
	function createModule(definition, obj){
		//文字列分割
		var parts = definition.split(".");
		var parent = app;

		//モジュール作成 リーフ要素は作成しない
		for(var i = 0; i < parts.length - 1; i++){
			//正規表現チェック
			if (!reg.test(parts[i])){
				throw new Error("不正なネームスペースです[" + definition + "]");
			}

			//モジュールチェック
			if (typeof parent[parts[i]] === "undefined"){
				parent[parts[i]] = {};
			}
			parent = parent[parts[i]];
		}

		//リーフ要素のチェック　重複していればエラー
		if(typeof parent[parts[i]] === "object"){
			throw new Error("重複したネームスペースです[" + definition + "]");
		}
		parent[parts[i]] = obj;
	}

	//モジュール取得用
	function getModule(definition){
			//文字列分割
			var parts = definition.split(".");
			var parent = app;

			//モジュール探索
			for(var i = 0; i < parts.length; i++){
				//正規表現チェック
				if (!reg.test(parts[i])){
					throw new Error("不正なネームスペースです[" + definition + "]");
				}

				//モジュールチェック
				if (typeof parent[parts[i]] === "undefined"){
					throw new Error("存在しないネームスペースです[" + definition + "]");
				}
				parent = parent[parts[i]];
			}
			return parent;
		}


	return {
		// 公開メソッド
		/*
		モジュール設定、取得
		obj引数がundefinedの場合取得
		*/
		module: function module(definition, obj){
			if(typeof obj === "undefined"){
				return getModule(definition);
			}else{
				createModule(definition, obj);
			}
		}


	};

})();