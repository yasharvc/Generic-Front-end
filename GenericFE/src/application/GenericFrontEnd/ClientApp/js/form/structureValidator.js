function validateFormStructure(inputData){
	if(isNullOrUndefined(inputData.props))
		inputData.props = {};
	if(isNullOrUndefined(inputData.objectId))
		inputData.objectId = uuidv4();
	if(isNullOrUndefined(inputData.props)
	|| isNullOrUndefined(inputData.props.disable))
		inputData.props.disable=false;

	if(isNullOrUndefined(inputData.props.icon) && isNullOrUndefined(inputData.props.imageURL))
		inputData.props.iconType = 0;
	else{
		if(isNullOrUndefined(inputData.props.iconType)
		|| isNaN(inputData.props.iconType)
		|| parseInt(inputData.props.iconType) > 2
		|| parseInt(inputData.props.iconType) < 1){
			debugger;
			if(!isNullOrUndefined(inputData.props.icon)){
				inputData.props.iconType = 1;
			}
			else if(!isNullOrUndefined(inputData.props.imageURL)){
				inputData.props.iconType = 2;
			}
		}
	}
	return true;
}