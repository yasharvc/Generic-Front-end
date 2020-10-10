function translateTab(tab,i18n){
	if(isTranslateRequested(i18n) && !isNaN(i18n.lang)){
		i18n.lang += "";
		if(isNullOrUndefined(tab.title_i18n)){
			tab.title_i18n = tab.title;
		}
		tab.title = upperCaseFirstCharacter(translateWord(tab.title_i18n,i18n.lang));
	}
	return true;
}