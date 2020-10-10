var app = {};
document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	if (typeof Map !== 'function') {
		return;
	}
	app = new Vue({
		el:'#app',
		data:function (){
			return{
				application : null,
				leftDrawerOpen:false,
				rightDrawerOpen:false,
				currentTab:"",
				inProgress:true,
				token:'',
				tabFormData:[],
				tabs:[]
			};
		},
		created: function () {
			initVueQuasarApp(this);
			this.getApplicationInfo().then(function(res){
				app.application = res;
				app.getLeftMenu().then(function(lmenu){
					app.application.leftMenu = lmenu;
				});
				app.getRightMenu().then(function(rmenu){
					app.application.rightMenu = rmenu;
				});
				app.getFirstPage();
				var languageSetting = changeLanguage(app.application.i18n.lang);
				app.application.i18n.RTL = languageSetting.rtl;
			});
		},
		methods:{
			valueChanged: function(tab,fieldName,value){
				for (var i = 0; i < this.tabs.length; i++) {
					var element = this.tabs[i];
					if(element.id == tab.id){
						this.tabs[i].json.form[fieldName] = value;
						this.doActionOnControl(i,fieldName,function(ctrl){
							ctrl.isChanged = true;
						});
						return;
					}
				}
			},
			setTabJSON:function(tabId,json){
				var tab = this.tabs.find(function(t){
					return t.id == tabId;
				});
				tab.inProgress = false;
				tab.json = json;
				var formData = {};
				formData[tabId] = json.form;
				app.tabFormData.push(formData);
			},
			getLeftMenu: function(){
				return new Promise(function(resolve,reject){
					setTimeout(function(){
						resolve(getMockLeftMenu(app.token));
					},500);
				});
			},
			getRightMenu: function(){
				return new Promise(function(resolve,reject){
					setTimeout(function(){
						resolve(getMockRightMenu(app.token));
					},500);
				});
			},
			getApplicationInfo: function(){
				return new Promise(function(resolve,reject){
					setTimeout(function(){
						resolve(getMockApplicationInfo());
					},500);
				});
			},
			getAnonymousePage: function(){
				return new Promise(function(resolve,reject){
					setTimeout(function(){
						resolve(getMockAnonymousePage());
					},500);
				});
			},
			getFirstPage:function(){
				if(isEmptyOrNullString(this.token)){
					//Anonymouse page request
					this.getAnonymousePage().then(function(res){
						app.currentTab=res.startTab;
						runScript(app,res.initalScript);
						app.inProgress=false;
					});
				}else{
					//get menu and home page
				}
			},
			leftMenuItemClicked:function(menu,index){
				// for(var i = 0 ; i < this.application.leftMenu.length ; i++){
				// 	this.application.leftMenu[i].selected = false;
				// }
				// this.application.leftMenu[index].selected = true;
				this.$q.notify(menu.link);
				runScript(app,menu.script);
			},
			rightMenuClicked:function(menu,index){
				this.rightDrawerOpen = false;
				this.$q.notify(menu.link);
			},
			closeTab: function(tab,index){
				if(tab.closable != false){
					this.tabs.splice(index,1);
					if(tab.id == this.currentTab)
						this.currentTab="homepage";
					var index = 
						app.tabFormData.findIndex(function(f){return typeof f[tab.id] != 'undefined';});
					if(index != -1)
						app.tabFormData.splice(index,1);
				}
			},
			clearApplication:function(){
				app.application.applicationCleared = false;
				validateFormStructure(app.application);
				translateForm(app.application,app.application.i18n);
				app.application.applicationCleared = true;
				return app.application;
			},
			clearControls:function(inputData){
				inputData.controlsCleared = false;
				inputData.illegalControls = [];
				var ctrls = inputData.controls;
				var validCtrls = [];
				ctrls.forEach(function(ctrl){
					if(!isEmptyOrNullString(ctrl.type))
					{
						ctrl.type = ctrl.type.toLowerCase();
						if(ctrl.type == 'integer'
						&& validateIntegerControlStructure(ctrl)
						&& translateIntegerControl(ctrl,this.application.i18n)){
							ctrl.formObjectId = inputData.name;
							ctrl.objectId = uuidv4();
							validCtrls.push(ctrl);
						}else{
							inputData.illegalControls.push(ctrl);
						}
					}
				});
				inputData.controls = validCtrls;
				inputData.controlsCleared = true;
				return inputData.controls;
			},
			clearTabs:function(){
				app.tabCleared = false;
				app.tabs.forEach(function(tab){
					validateTabStructure(tab);
					translateTab(tab,app.application.i18n);
				});
				app.tabCleared = true;
				return app.tabs;
			},
			doActionOnControl : function(tabIndex,field,action){
				this.tabs[tabIndex].json.controls.find(function(o, i){
					if (o.field == field) {
						action(app.tabs[tabIndex].json.controls[i]);
						return true;
					}
				});
			}
		},
		computed:{
			leftMenu:function(){
				var menu = this.computedApplication.leftMenu;
				menu.forEach(function(lm){
					validateLeftMenuStructure(lm);
					translateLeftMenu(lm,app.application.i18n);
				});
				return menu;
			},
			rightMenu:function(){
				return this.computedApplication.rightMenu;
			},
			computedApplication:function(){
				return this.clearApplication();
			},
			getSelectedTab: function(){
				for(var i = 0 ; i < tabs.length ; i++){
					if(tabs[i].selected)
						return tabs[i].id;
				}
				return "";
			}
		}
	});
}, false);