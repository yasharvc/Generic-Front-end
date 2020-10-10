//addNewTab(tabTitle,icon,closable,id,oneInstance)
//closeMenu()
//setCurrentTab(name)
//gotolastcreatedtab()
//getForm([GET|POST|GraphQL],url,dataobj)


var newlyAddedTabId = null;
function runScript(app,command){
	var commands = command.split(";");
	commands.forEach(function(command){
		runCommand(app,command);
	});
}

function runCommand(app,command){
	var index = 0;
	var parsedObjects = [];
	do{
		var currentToken = getNextToken(command,index);
		if(currentToken.token.trim().length > 0)
			parsedObjects.push(currentToken.token);
		index = currentToken.index;
	}while (currentToken.index > 0 && currentToken.index < command.length);
	if(parsedObjects.length === 0)
		return;
	if(parsedObjects[0].toLocaleLowerCase() == "addnewtab"){
		return addNewTab(
			app,
			parsedObjects[1],
			parsedObjects[2],
			parsedObjects[3] === 'true', 
			parsedObjects[4],
			parsedObjects[5] === 'true');
	}
	else if(parsedObjects[0].toLocaleLowerCase() == "closemenu"){
		closeMenu(app);
	}
	else if(parsedObjects[0].toLocaleLowerCase() == "setcurrenttab"){
		setCurrentTab(app,parsedObjects[1]);
	}else if(parsedObjects[0].toLocaleLowerCase() == "gotolastcreatedtab"){
		setCurrentTab(app,newlyAddedTabId);
	}
}

function closeMenu(app){
	app.leftDrawerOpen = false;
}
function setCurrentTab(app,name){
	app.currentTab = name;
}

function addNewTab(app,tabTitle,icon,closable,id,oneInstance){
	var tab = app.tabs.find(function(x){
		return x.id == id;
	});
	if(!isNullOrUndefined(tab) &&
	   !isNullOrUndefined(tab.oneInstance) && 
	   tab.oneInstance)
	   return;
	id = isEmptyOrNullString(id) ? uuidv4() : id;
	newlyAddedTabId = id;
	app.tabs.push(
		{
		id : id,
		icon:isNullOrUndefined(icon)?"" : icon,
		title:tabTitle,
		closable:closable,
		oneInstance : oneInstance,
		inProgress:true,
		badges:[
			{
				color:"orange",
				value:"5"
			}
		]
	});
	return id;
}