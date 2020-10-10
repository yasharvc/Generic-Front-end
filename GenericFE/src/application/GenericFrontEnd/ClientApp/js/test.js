var resolves = [];
var rejects = [];

function callBE(guid,resolve,reject,params){
	resolves[guid] = resolve;
	rejects[guid] = reject;
	//Call BE function by (params,guid)
	//In BE resolved(guid,value) or rejected(guid,errorStr) will call
}

function resolved(guid,value){
	resolves[guid](value);
}

function rejected(guid,error){
	rejects[guid](error);
}

callBE("1",function(x){
	debugger;
	console.log("first : " + x);
});

callBE("2",function(y){
	console.warn("second : " + y);
});