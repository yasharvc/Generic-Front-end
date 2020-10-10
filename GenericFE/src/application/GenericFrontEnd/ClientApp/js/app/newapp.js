var APP = {};
var initialData = {
	applicationInfo : {
		inMaintenance:false,
		title:"ACCOUNTING",
		copyright:"copyright by phigaro 2020".toLocaleUpperCase(),
		desc:"BY PHIGARO",
		userId:"Yashar",
		userInfo:"Software Engineer",
		logoImageURL:"/images/Tribit.png",
		i18n:{
			lang:1033,
			translate:false
		}
	},
	formDATA:{},
	props:{
		disable:false,
		inProgress:false,
		fatalError:false,
		token:"",
		leftDrawerOpen: true,
		rightDrawerOpen: false
	},
	tabsInfo:{
		currentTab:"",
		tabData:[],
		tabs:[]
	},
	leftMenu:[{
		groupName:"mainmenu",
		title:"Main Menu",
		icon:"email",
		items:
		[
			{
				id:"google",
				title:"Google",
				icon:"login",

				kind:"redirect",
				link:'http://www.google.com',

				props:{}
			},
			{
				id:"homepage",
				title:"Home",
				icon:"home",

				kind:"oneinstancetab",
				link:'showAlert',

				props:{
					id:"homepage",
					title:"HOME",
					icon:"home",
					closable:false,
					callType:'function'//postgraphql|getgraphql|post|get
				},
			}
		]}
	],
	rightMenu:[{
		id:"qrfsdf",
		title:"qr reader",
		icon:"code"
	}]
};
document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	if (typeof Map !== 'function') {
		return;
	}

	var mixin = Vue.mixin({
		methods: {
		  tr: function (word,i18n,placeHolders) {
			if(i18n.translate)
			{
				return upperCaseFirstCharacter(translateWord(word,i18n.lang,placeHolders));
			}
			return word;
		  },
		  logger:function(){
			  return logger;
		  },
		  application:function(){
			  return APP;
		  }
		},
	});

	APP = new Vue({
		mixin:mixin,
		el:'#app',
		data:function (){
			return initialData;
		},
		created: function () {
			initVueQuasarApp(this);
		},
		methods:{
			translate:function(word,placeholders){
				return tr(word,applicationInfo.i18n,placeholders);
			},
			addNewMultiInstanceTab:function(tab){
				this.tabsInfo.tabs.push(tab);
				this.tabsInfo.currentTab = tab.id;
			},
			addNewOneInstanceTab:function(newTab){
				var tab = this.tabsInfo.tabs.find(function(tab){
					return tab.id == id;
				});
				if(isNullOrUndefined(tab)){
					this.tabsInfo.tabs.push(newTab);
					this.tabsInfo.currentTab = newTab.id;
				}
			},
			leftMenuClicked:function(group,menu,index){
				handleLeftMenuClick(APP,group,menu,index);
			},
			valueChanged:function(tabId,sectionId,field,value){
				//var tabId = obj.tabId,sectionId = obj.sectionId,field=obj.field,value = obj.value;
				for (var i = 0; i < this.tabsInfo.tabs.length; i++) {
					var element = this.tabsInfo.tabs[i];
					if(element.id == tabId){
						this.tabsInfo.tabs[i].json.data[field] = value;
						
						// this.doActionOnControl(i,fieldName,function(ctrl){
						// 	ctrl.isChanged = true;
						// });
						return;
					}
				}
			},
			validate:function(obj){
				var val = obj.value,target = obj.uuid;
				return new Promise(function(resolve,reject){
					if(val.length > 3){
						resolve(true);
					}
					else
						reject(val);
				});
			}
		},
		computed:{
		}
	});
}, false);