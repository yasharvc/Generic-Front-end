function translateIntegerControl(ctrl,i18n){
	if(isTranslateRequested(i18n) && !isNaN(i18n.lang)){
		i18n.lang += "";
		if(isNullOrUndefined(ctrl.label_i18n)){
			ctrl.label_i18n = ctrl.label;
			ctrl.subLabel_i18n = ctrl.subLabel;
			ctrl.hint_i18n = ctrl.hint;
			ctrl.hoverText_i18n = ctrl.hoverText;
		}
		ctrl.label = upperCaseFirstCharacter(translateWord(ctrl.label_i18n,i18n.lang));
		ctrl.subLabel = upperCaseFirstCharacter(translateWord(ctrl.subLabel_i18n,i18n.lang));
		ctrl.hoverText = upperCaseFirstCharacter(translateWord(ctrl.hoverText_i18n,i18n.lang));
		ctrl.hint = upperCaseFirstCharacter(translateWord(ctrl.hint_i18n,i18n.lang));
	}
	return true;
}