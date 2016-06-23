/**
ストレージ管理用
*/
ModuleManager.module("myapp.common.storagemanager", (function(){

	if(!window.localStorage){
		throw new Error("localStorageはサポート対象外です");
	}

	return {
		save: function save(key, value){
			localStorage.setItem(key, value);
		},

		load: function load(key){
			return localStorage.getItem(key);
		},

		saveObject: function saveObject(key, json){
			localStorage.setItem(key, JSON.stringify(json));
		},

		loadObject: function loadObject(key){
			return JSON.parse(localStorage.getItem(key));
		},

		removeData: function removeData(key){
			localStorage.removeItem(key);
		},

		exists: function exists(key){
			return localStorage.getItem(key) !== null;
		}
	}
})());