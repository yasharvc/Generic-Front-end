var dictionary = {};

function addToDictionary(entries){
	Object.keys(entries).forEach(function(key,index) {
		//TODO: Clear placeholder if not set
		if(!isNullOrUndefined(dictionary[key])){
			//TODO: test for duplication on langid or new langid
		}else{
			dictionary[key.toLocaleUpperCase()] = entries[key];
		}
	});
}

function translateWord(text,lang,placeholders){
	try{
		var entry = dictionary[text.toUpperCase().trim()];
		var res = entry[lang].toLocaleLowerCase();
		if(!isNullOrUndefined(entry.placeholderCount) && !isNaN(entry.placeholderCount)){
			for(var i = 0 ; i < parseInt(entry.placeholderCount) ; i++){
				res = replaceAll(res,placeholerStartTag + (i+1) + placeholerFinishTag,
				placeholders.length > i ? placeholders[i] : "");
			}
		}
		return res;
	}catch(error){
		logger.warn("Translate","Word `" + text + "` was not found in dictionary.");
		return text;
	}
}