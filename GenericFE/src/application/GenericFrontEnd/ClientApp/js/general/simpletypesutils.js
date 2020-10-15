function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
}

function isEmptyOrNullString(str){
	return isNullOrUndefined(str) || str.length == 0;
}

function isNullOrUndefined(obj){
	return obj == null || typeof obj == 'undefined';
}

function upperCaseFirstCharacter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function replaceTabAndEnterChars(str){
	return str.replaceAll("\r","\\r").replaceAll("\n","\\n").replaceAll("\t","\\t");
}

function stringInject(str, data) {
    if (typeof str === 'string' && (data instanceof Array)) {

        return str.replace(/({\d})/g, function (i) {
            return data[i.replace(/{/, '').replace(/}/, '')];
        });
    } else if (typeof str === 'string' && (data instanceof Object)) {

        if (Object.keys(data).length === 0) {
            return str;
        }

        for (var key in data) {
            return str.replace(/({([^}]+)})/g, function (i) {
                let key = i.replace(/{/, '').replace(/}/, '');
                if (!data[key]) {
                    return i;
                }

                return data[key];
            });
        }
    } else if (typeof str === 'string' && data instanceof Array === false || typeof str === 'string' && data instanceof Object === false) {

        return str;
    } else {

        return str;
    }
}