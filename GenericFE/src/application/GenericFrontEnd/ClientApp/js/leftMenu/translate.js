function translateLeftMenu(menu,i18n){
	if(isTranslateRequested(i18n) && !isNaN(i18n.lang)){
		i18n.lang += "";
		if(isEmptyOrNullString(menu.title_i18n) 
		|| isEmptyOrNullString(menu.lastLang)
		|| menu.lastLang + "" != i18n.lang){
			menu.title_i18n = menu.title;
		}
		menu.title = upperCaseFirstCharacter(translateWord(menu.title_i18n,i18n.lang));
	}
	return true;
}