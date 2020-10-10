function addJustTemplateComponent(id){
	Vue.component(id,{template:'#' + id + '-template'});
}

addJustTemplateComponent('y-fullpage-loading');

Vue.component('y-app',{
	props: ['app'],
	created:function(){
	},
	template:'#y-app-template',
	methods:{
		leftMenuClicked:function(group,menu,index){
			handleLeftMenuClick(APP,group,menu,index);
		},
		valueChanged:function(obj){
			this.$emit('value-changed',obj);
		},
		onValidate:function(obj){
			this.$emit('on-validate',obj);
		}
	}
});
Vue.component('y-page',{
	props: ['app','langId'],
	template:'#y-page-template',
	mounted:function(){
		this.app.applicationInfo.i18n.rtl = changeLanguage(this.langId).rtl;
	},
	watch:{
		langId:function(val){
			this.app.applicationInfo.i18n.rtl = changeLanguage(val).rtl;
		}
	},
	methods:{
		leftMenuClicked:function(group,menu,index){
			this.$emit('left-menu-click',group,menu,index);
		},
		valueChanged:function(obj){
			this.$emit('value-changed',obj);
		},
		onValidate:function(obj){
			this.$emit('on-validate',obj);
		}
	}
});

Vue.component('y-page-header',{
	props: ['leftMenu','rightMenu','applicationInfo','tabsInfo','app'],
	template:'#y-page-header-template',
	computed:{
		leftDrawerOpen:{
			get:function(){
				return this.app.props.leftDrawerOpen;
			},
			set:function(newVal){
				this.app.props.leftDrawerOpen = newVal;
			}
		},
		rightDrawerOpen:{
			get:function(){
				return this.app.props.rightDrawerOpen;
			},
			set:function(newVal){
				this.app.props.rightDrawerOpen = newVal;
			}
		}
	}
});
Vue.component('y-left-menu',{
	props: ['leftMenu','app','i18n'],
	template:'#y-left-menu-template',
	computed:{
		leftDrawerOpen:{
			get:function(){
				return this.app.props.leftDrawerOpen;
			},
			set:function(newVal){
				this.app.props.leftDrawerOpen = newVal;
			}
		}
	},
	methods:{
		leftMenuItemClicked:function(group,menu,index){
			this.$emit('menu-click',group,menu,index);
		}
	}
});
Vue.component('y-footer',{
	props: ['leftMenu','rightMenu','app','i18n'],
	template:'#y-footer-template',
	computed:{
		leftDrawerOpen:{
			get:function(){
				return this.app.props.leftDrawerOpen;
			},
			set:function(newVal){
				this.app.props.leftDrawerOpen = newVal;
			}
		},
		rightDrawerOpen:{
			get:function(){
				return this.app.props.rightDrawerOpen;
			},
			set:function(newVal){
				this.app.props.rightDrawerOpen = newVal;
			}
		}
	}
});
Vue.component('y-right-menu',{
	props: ['rightMenu','app','i18n'],
	template:'#y-right-menu-template',
	computed:{
		rightDrawerOpen:{
			get:function(){
				return this.app.props.rightDrawerOpen;
			},
			set:function(newVal){
				this.app.props.rightDrawerOpen = newVal;
			}
		}
	},
	methods:{
		rightMenuItemClicked:function(menu,index){
			logger.info(JSON.stringify(menu));
		}
	}
});
Vue.component('y-content',{
	props: ['app','i18n'],
	template:'#y-content-template',
	computed:{
		currentTab:{
			get:function(){
				return this.app.tabsInfo.currentTab;
			},
			set:function(newVal){
				debugger;
				this.app.tabsInfo.currentTab = newVal;
			}
		},
		tabs:function(){
			return this.app.tabsInfo.tabs;
		}
	},
	methods:{
		valueChanged:function(obj){
			this.$emit("value-changed",obj);
		},
		onValidate:function(obj){
			this.$emit('on-validate',obj);
		}
	}
});
Vue.component('y-tab-content',{
	props: ['json','i18n','app','tab'],
	created:function(){
	},
	template:'#y-tab-content-template',
	methods:{
		leftMenuClicked:function(group,menu,index){
			handleLeftMenuClick(APP,group,menu,index);
		},
		valueChanged:function(tabId,sectionId,field,value){
			logger.info("Value changed","tabs[" + tabId + "][" +  sectionId+ "]." + field + ":" + value );
			this.$emit('value-changed',{tabId,sectionId,field,value});
		},
		onValidate:function(obj){
			this.$emit('on-validate',obj);
		}
	}
});







Vue.component('y-maintenace-page',{
	template:'#y-maintenace-page-template',
	data:function(){
		return{
			langTitles:langTitles,
			tab:langTitles[0].id,
			splitterModel: 20
		};
	}
});
Vue.component('y-fatal-error',{
	data:function(){
		return{
			langTitles:langTitles,
			tab:langTitles[0].id,
			splitterModel: 20
		};
	},
	template:'#y-fatal-error-template'
});
Vue.component('y-form-title',{
	props: ['json','i18n'],
	template:'#y-form-title-template'
});
Vue.component('y-simpleform',{
	created:function(){	
		if(!isNullOrUndefined(this.json.controls)){
			var a = this.app;
			this.json.controls.forEach(function(control){
				// logger.info('simple form created',control.field + ":" + control.default);
				// debugger;
				// //logger.info('',a.formDATA[control.UUID]);
				// a.formDATA[control.UUID] = control.default;
			});
		}
	},
	methods:{
		validate:function(value,target){
			//this.$emit('on-validate',{value:value,uuid:target.name});
			var refs = this.$refs;
			var application = this.application();
			return new Promise(function(resolve,reject){
				var validateResult = application.validate({value:value,uuid:target.name});
				validateResult.then(function(res){
					if(typeof refs[target.name].resetValidation != 'undefined')
						refs[target.name].resetValidation();
					resolve(true);
				}).catch(function(errors){
					resolve(errors);
				});
			});
		},
		consolelog:function(sectionId){
			//APP.formDATA["homepage_ddd_xxx_yyy"]
			//APP.tabsInfo.tabs<find by tabid>.sections.find(function(s){return s.id===sectionId;})
			logger.info(this.tabid+ '_' + sectionId);
		}
	},
	props: ['json','i18n','tabid','sectionid','app','formData'],
	template:'#y-simpleform-template'
});