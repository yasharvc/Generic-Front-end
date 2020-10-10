function translateForm(form,i18n){
	if(isTranslateRequested(i18n) && !isNaN(i18n.lang)){
		i18n.lang += "";
		if(isEmptyOrNullString(form.title_i18n) 
		|| isEmptyOrNullString(form.lastLang)
		|| form.lastLang + "" != i18n.lang){
			form.title_i18n = form.title;
			form.desc_i18n = form.desc;
			form.copyright_i18n = form.copyright;
			form.lastLang = i18n.lang;
		}
		form.title = upperCaseFirstCharacter(translateWord(form.title_i18n,i18n.lang));
		form.desc = upperCaseFirstCharacter(translateWord(form.desc_i18n,i18n.lang));
		form.copyright = upperCaseFirstCharacter(translateWord(form.copyright_i18n,i18n.lang));
	}
	return true;
}