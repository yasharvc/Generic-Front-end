var APP = {};

var GraphQL_Post = 1,
	GraphQL_Get = 2,
	Get = 3,
	Post = 4;

var appInfoRequestGQL = {
	type: GraphQL_Post,
	url: "/graphql",
	requestBody: "{applicationInfo{copyright,desc,i18n{lang,translate,},inMaintenance,logoImageURL,title,userId,userInfo,}}",
	variable: ''
};

var appInfoRequest = {
	type: Get,
	url: "/API/ApplicationInfo",
	requestBody: {}
};

var loginRequest = {
	type: GraphQL_Post,
	url: "/graphql",
	requestBody: "query login($email:String  $pass: String){login(email:$email ,password:$pass){...on AuthenticateResult{token}...on ErrorList{errors{code,description,errorKind,languageLocale}}}}",
	variable: '{"pass": "123","email": "yashar@tribitgroup.com"}'
};

var anonymousePageRequest = {
	type: GraphQL_Post,
	url: "/graphql",
	requestBody: "{getAnonymousePage}"
};

var applicationRequest = {
	type: GraphQL_Post,
	url: "/graphql",
	requestBody: "{application}",
	variable: '{"pass": "123","email": "yashar@tribitgroup.com"}',
	authenticationType: 'jwt',
	authentication: 'TOKEN HERE'
};//Get leftmenu + rightmenu + statrup tabs + Menu id that must click after loading


var initialData = {
	applicationInfo: {},
	formDATA:{},
	props:{
		disable:false,
		inProgress:true,
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
			this.startFlow();
			initVueQuasarApp(this);
		},
		methods: {
			startFlow: function (step) {
				if (isNullOrUndefined(step)) {
					runRequest(appInfoRequestGQL)
						.then(function (res) {
							initialData.applicationInfo = res.applicationInfo;
							APP.props.inProgress = false;
						});
				} else {
					step = parseInt(step);
					if (step == 1) {
						if (isEmptyOrNullString(this.props.token)) {

						}
					}
				}
			},
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