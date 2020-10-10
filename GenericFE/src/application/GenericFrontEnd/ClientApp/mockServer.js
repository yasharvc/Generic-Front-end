function getMockApplicationInfo(){
	return {
		title:"ACCOUNTING",
		desc:"PHIGARO",
		logoImageURL:"https://cdn.quasar.dev/logo/svg/quasar-logo.svg",
		copyright:"copyright by phigaro 2020".toLocaleUpperCase(),
		inMaintenance:true,
		i18n:{
			lang:1033,
			translate:true
		}
	};
}

function getMockLeftMenu(token){
	if(isEmptyOrNullString(token)){
	return [{
			id:"homepage",
			title:"Home",
			icon:"home",
			link:'/homepage',
			selected:false,
			script:'addNewTab("HOME","home",false,"homepage",true);'
		}
		,{
			id:uuidv4(),
			title:"Login",
			icon:"login",
			link:'/delete',
			selected:false,
			script:'addNewTab("Delete","lock",true,"login",true);setCurrentTab("login")'
		},{
			id:uuidv4(),
			title:"Register",
			icon:"adduser",
			link:'/test',
			selected:false,
			script:'addNewTab("Yashar","list",true);gotoLastCreatedTab();'
		}
	];
	}else{
		return [{
			id:"homepage",
			title:"Home",
			icon:"home",
			link:'/homepage',
			selected:false,
			script:'addNewTab("خانه","home",false,"homepage",true);'
		}];
	}
}

function getMockRightMenu(token){
	return [];
}

function showAlert(){
	return new Promise(function(resolve,reject){
		resolve([
			{
				id:"title",
				meta:{type:"label",title:"Welcome to my page!"}
			},
			{
				id:"username",
				props:{
					disable:false,
					readonly:false
				},
				meta:{type:"simpleform",title:"This is simple form!"},
				controls:[{
					id:'firstName',
					type:"text",
					title:"Name",
					field:"fname",
					default:"یاشار",
					disable:false
				},{
					id:'userAge',
					type:"integer",
					title:"age",
					field:"age",
					default:34,
					disable:false
				}]
			},
			{
				id:"ddd",
				props:{
					disable:false,
					readonly:false
				},
				meta:{type:"simpleform",title:"سلام عزیزان"},
				controls:[{
					id:'fname',
					type:"text",
					title:"Name",
					field:"fname",
					default:"sds",
					disable:true
				},{
					id:'sss',
					type:"integer",
					title:"SAda",
					field:"age",
					default:34,
					disable:false
				},
				{
					id:'msg',
					type:"consolelogbutton",
					title:"Console log",
					disable:false		
				}]
			}
		]);
	});
}

function getMockAnonymousePage(){
	setTimeout(function(){
		var ctrl1 = getIntegerComponent('count','Ball count',false,1,100);
		ctrl1.label = "Count";
		validateIntegerControlStructure(ctrl1);
		APP.setTabJSON("homepage",{type:"simpleform",name:"login",controls:
		[
			ctrl1,ctrl1
		],form:{fname:"yashar",lname:"aliabbasi",count:5}});
	},1000);
	// setTimeout(function(){
	// 	APP.setTabJSON("login",{type:"homepage",name:"xyz",form:{xyz:"dasdsa"}});
	// },5000);
	return {initalScript:'addNewTab("HOME","home",false,"homepage",true)',startTab:"homepage"};
}