var defaultInteger = 0;
function validateIntegerControlStructure(ctrl){
	if(!isNullOrUndefined(ctrl.props)){
		var props = ctrl.props;
		ctrl.hasMin = (!isNullOrUndefined(props.min) && !isNaN(props.min));
		ctrl.hasMax = (!isNullOrUndefined(props.max) && !isNaN(props.max));
		ctrl.hasLimit = ctrl.hasMin || ctrl.hasMax;
	}
	if(isNullOrUndefined(ctrl.disable))
		ctrl.disable=false;
	if(isNullOrUndefined(ctrl.defaultValue)
		|| isNaN(ctrl.defaultValue)){
		ctrl.defaultValue=defaultInteger;
	}
	return true;
}