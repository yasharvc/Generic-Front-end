function isSpace(ch){
	var spaces =" \t";
	return spaces.indexOf(ch) != -1;
}

function isEscapeChars(ch){
	var escapeChars = "\"',(); \t\r\n[]+-|*/~!=@#$%";
	return escapeChars.indexOf(ch) != -1;
}

function isStringChar(ch){
	return ch == "\"";
}

function getNextToken(command,index){
	index = isNaN(index) ? 0 : index;
	var res = "";
	for(; index < command.length ; index++){
		var currChar = command[index];
		if(isSpace(currChar))
			continue;
		else if(isStringChar(currChar) && res == ''){
			for(var i = index + 1 ; i < command.length ; i++){
				if(isStringChar(command[i]) && (i > 0 && command[i-1] != '\\'))
					return {token:res,index:i+1};
				else
					res += command[i];
			}
		}
		else if(isEscapeChars(currChar))
			return {token:res,index:index+1};
		res += currChar;
	}
	return {token:res,index:index};
}