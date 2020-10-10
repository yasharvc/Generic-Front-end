var LOG_NONE    = 0;
var LOG_CRITICAL= 1;
var LOG_ERROR   = 2;
var LOG_WARNING = 4;
var LOG_INFO    = 8;
var logDebug   = 7;
var logTrace   = 15;
var logVerbose = 63;

var logLevel = logVerbose;


var logger = {
	warn : function(title,msg){
		title = isEmptyOrNullString(title) ? "-" : title;
		title = replaceTabAndEnterChars(title);
		msg = isEmptyOrNullString(msg) ? "-" : msg;
		msg = replaceTabAndEnterChars(msg);
		//!TIMESTAMP\tTITLE\tMSG!
		var warning = "!" + (new Date().getTime()) + "\t" + title + "\t" + msg + "!\r\n"
		if(hasLogLevel(LOG_WARNING))
			reportWarn(warning);
		return warning;
	},
	info : function(title,msg){
		title = isEmptyOrNullString(title) ? "-" : title;
		title = replaceTabAndEnterChars(title);
		msg = isEmptyOrNullString(msg) ? "-" : msg;
		msg = replaceTabAndEnterChars(msg);
		//[TIMESTAMP\tTITLE\tMSG]
		var info = "[" + (new Date().getTime()) + "\t" + title + "\t" + msg + "]\r\n"
		if(hasLogLevel(LOG_INFO))
			reportInfo(info);
		return info;
	},
	error : function(title,msg){
		title = isEmptyOrNullString(title) ? "-" : title;
		title = replaceTabAndEnterChars(title);
		msg = isEmptyOrNullString(msg) ? "-" : msg;
		msg = replaceTabAndEnterChars(msg);
		//<TIMESTAMP\tTITLE\tMSG>
		var errorStr = "<" + (new Date().getTime()) + "\t" + title + "\t" + msg + ">\r\n"
		if(hasLogLevel(LOG_ERROR))
			reportError(errorStr);
		return errorStr;
	},
	critical : function(title,msg){
		title = isEmptyOrNullString(title) ? "-" : title;
		title = replaceTabAndEnterChars(title);
		msg = isEmptyOrNullString(msg) ? "-" : msg;
		msg = replaceTabAndEnterChars(msg);
		//~TIMESTAMP\tTITLE\tMSG~
		var errorStr = "~" + (new Date().getTime()) + "\t" + title + "\t" + msg + "~\r\n"
		if(hasLogLevel(LOG_CRITICAL))
			reportFatalError(errorStr);
		return errorStr;
	}
}

function hasLogLevel(level){
	return logLevel & level == level;
}

function reportInfo(str){
	console.info(str);
}
function reportWarn(str){
	console.warn(str);
}
function reportError(str){
	console.error(str);
}
function reportFatalError(str){
	console.error('>>>>>' + str);
}