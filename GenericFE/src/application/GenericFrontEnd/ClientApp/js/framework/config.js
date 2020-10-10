var debounceTimeout = 500;

window.quasarConfig = {
		brand: { // this will NOT work on IE 11
		  primary: '#086491',//'#e46262',
		  secondary:'#026A69A',
		  accent:'#9C27B0',
	
		  positive:'#21BA45',
		  negative:'#C10015',
		  info:'#31CCEC',
		  warning:'#F2C037'
		},
		animations: 'all',
		notify: {}
};
function initVueQuasarApp(app){
	Vue.config.keyCodes.f1 = 112;
	Vue.config.keyCodes.f2 = 113;
	Vue.config.keyCodes.f3 = 114;
	Vue.config.keyCodes.f4 = 115;
	Vue.config.keyCodes.f5 = 116;
	Vue.config.keyCodes.f6 = 117;
	Vue.config.keyCodes.f7 = 118;
	Vue.config.keyCodes.f8 = 119;
	Vue.config.keyCodes.f9 = 120;
	Vue.config.keyCodes.f10= 121;
	Vue.config.keyCodes.f11= 122;
	Vue.config.keyCodes.f12= 123;
	app.$q.screen.setDebounce(debounceTimeout);
}

function changeLanguage(langId){
	var langidToQuasarLang = {};
	if(isNaN(langId))
		return
	langId = parseInt(langId);
	langidToQuasarLang[1033] = {q:Quasar.lang.enUs,rtl:false};
	langidToQuasarLang[1065] = {q:Quasar.lang.faIr,rtl:true};
	langidToQuasarLang[2057] = {q:Quasar.lang.enGb,rtl:false};
	if(!isNullOrUndefined(langidToQuasarLang[langId])){
		Quasar.lang.set(langidToQuasarLang[langId].q);
		return {rtl:langidToQuasarLang[langId].rtl};
	}
	return {rtl:false};
}