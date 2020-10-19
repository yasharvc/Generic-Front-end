function handleLeftMenuClick(app,group,menu,index){

	function findTabById(id){
		var res = app.tabsInfo.tabs.find(function(tab){
			return tab.id == id;
		});
		return res;
	}

	function runCallType(tab) {
		if (isNullOrUndefined(menu.tabProperties))
			return;
		var props = menu.tabProperties;
		props.callKind = isNullOrUndefined(props.callKind) ? 'AwaitableFunction' : props.callKind;
		props.callKind = props.callKind.trim().toLocaleLowerCase();
		debugger;
		if (props.callKind == 'awaitablefunction') {
			var call = new Function('return ' + menu.tabProperties.request.url)();
			call()
				.then(function(res){
					setControlsUUID(res,tab.id);
					tab.sections = res;
					tab.inProgress = false;
					app.logger().info("handleLeftMenuClick","result of function [" + menu.link + "] call :"+JSON.stringify(res));
				})
				.catch(function(err){
					app.logger().error('handleLeftMenuClick','Error on getting result of function `' + menu.link + '`:' + err);
				});
		}
	}

	function setControlsUUID(res,tabid){
		res.forEach(function(section){
			section.id = section.id || uuidv4();
			if(!isNullOrUndefined(section.controls)){
				section.controls.forEach(function(control){
					control.UUID = tabid+'_'+section.id+'_'+control.field+'_'+control.id;
				});
			}
		});
	}
	debugger;
	var kind = menu.kind.toLocaleLowerCase().trim();
	if(kind == "redirect"){
		window.location = menu.link;
	}else if(kind == "multiinstancetab"){
		var tab = {
			id : menu.id + '_' + uuidv4(),
			formData: {},
			icon: isNullOrUndefined(menu.tabProperties) ? "" : menu.tabProperties.icon,
			title: isNullOrUndefined(menu.tabProperties) ? "" : menu.tabProperties.title,
			closable: isNullOrUndefined(menu.tabProperties) ? true :menu.tabProperties.closable,
			request: isNullOrUndefined(menu.tabProperties) ? null : menu.tabProperties.request,
			oneInstance: false,
			inProgress:true,
			badges:[]
		};
		app.addNewMultiInstanceTab(tab);
		runCallType(tab);
	}else if(kind == "oneinstancetab"){
		if(isNullOrUndefined(menu.props.id)){
			app.logger().error(app.translate("_1000_"))
			return;
		}
		else if(!isNullOrUndefined(findTabById(menu.props.id)))
			return;
		var tab = {
			formData:{},
			id : menu.props.id,
			icon:menu.props.icon,
			title:menu.props.title,
			closable:menu.props.closable,
			oneInstance : true,
			inProgress:true,
			badges:[]
		};
		app.addNewOneInstanceTab(tab);
		runCallType(tab);
	}
}