function addGeneralProperties(component){
	component.label="";
	component.subLabel="";
	component.disable=false;
	component.required=true;
	component.hoverText="";
	component.defaultValue=null;
	component.hidden=false;
	component.isChanged = false;//Every change must make this true and reset to default value
	return component;
}

function getIntegerComponent(field,hint,readonly,min,max){
	return addGeneralProperties({
		type:"integer",
		props:{
			min:min,
			max:max
		},
		readonly: readonly,
		field:field,
		hint:hint
	});
}
function getPasswordComponent(field,hint,readonly){
	return {
		type:"password",
		readonly:false,
		isPassword:true,
		field:field,
		hint:hint,
		readonly:readonly
	};
}

function rowDecoration(cols){
	if(!isNaN(cols)){
		cols = parseInt(cols);
		return {
			col: "col-" + (cols > 0 && cols <= 12 ? cols : 1)
		};
	}
	debugger;
	return {
		col:cols
	};
}

function addRowDecoration(cols,component){
	component.rowDecoration = rowDecoration(cols);
	return component;
}

function addValidationRules(rules, component){
	component.rules = rules;
}