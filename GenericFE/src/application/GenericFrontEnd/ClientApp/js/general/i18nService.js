var placeholerStartTag = '~%';
var placeholerFinishTag = '%~';

function isTranslateRequested(i18n){
	return !isNullOrUndefined(i18n)&& i18n.translate === true;
}