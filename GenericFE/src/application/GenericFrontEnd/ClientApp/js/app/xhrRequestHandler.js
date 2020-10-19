function httpVerbSync(verb,url,data,headers){
	headers = isNullOrUndefined(headers) ? [] : headers;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( verb, theUrl, false );
	headers.forEach(function(header){
		var keys = Object.keys(header);
		keys.forEach(function(key){
			xmlHttp.setRequestHeader(header[key],key);
		});
	});
	xmlHttp.send(data);
	return xmlHttp.responseText;
}


function httpGetSync(url,data,headers)
{
	return httpVerbSync("GET",url,data,headers);
}
function httpPostSync(url,data,headers)
{
	return httpVerbSync("POST",url,data,headers);
}
//headers = [{x:"y"},{Authorization:"Bearer dsadsad"}]
function httpVerbAsync(verb,url,data,headers){
	headers = isNullOrUndefined(headers) ? [] : headers;
	if(typeof data === 'object')
		data = JSON.stringify(data);
	return new Promise(function(resolve,reject){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
				resolve(xmlHttp);
			}
			else if (xmlHttp.readyState == 4 && xmlHttp.status == 201){
				resolve(xmlHttp);
			}
			else if(parseInt(xmlHttp.status) >= 400 && parseInt(xmlHttp.status) < 600)
				reject(xmlHttp.status);
		}
		xmlHttp.open(verb, url, true);
		headers.forEach(function(header){
			var keys = Object.keys(header);
			keys.forEach(function(key){
				xmlHttp.setRequestHeader(key,header[key]);
			});
		});
		xmlHttp.send(data);
	});
}
function httpGetAsync(url,data,headers)
{
	return httpVerbAsync("GET",url,data,headers);
}
function httpPostAsync(url,data,headers)
{
	return httpVerbAsync("POST",url,data,headers);
}

function GraphqlGetAsync(url,query,variables,headers){
	headers = isNullOrUndefined(headers) ? [] : headers;
	variables = isNullOrUndefined(variables) 
		|| variables.trim().length == 0 ? null : variables;
	query = {query:query,variables:variables};
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('GET', url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function () {
			resolve(xhr.response);
		};
		headers.forEach(function(header){
			var keys = Object.keys(header);
			keys.forEach(function(key){
				xhr.setRequestHeader(key,header[key]);
			});
		});
		xhr.send(JSON.stringify(query));
	});
}
function GraphqlPostAsync(url,query,variables,headers){
	headers = isNullOrUndefined(headers) ? [] : headers;
	variables = isNullOrUndefined(variables) 
		|| variables.trim().length == 0 ? null : variables;
	query = {query:query,variables:variables};
	return new Promise(function(resolve,reject){
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = function () {
			resolve(xhr.response);
		};
		headers.forEach(function(header) {
			var keys = Object.keys(header);
			keys.forEach(function(key) {
				xhr.setRequestHeader(key,header[key]);
			});
		});
		xhr.send(JSON.stringify(query));
	});
}


function runRequest(request, paramsObject, token) {
	var headers = [];
	if (!isNullOrUndefined(token)) {
		if (!isNullOrUndefined(request.authenticationKind)) {
			if (parseInt(request.authenticationKind) == JwtToken)
				headers.push({ Authorization: "Bearer " + token });

		} else {
			headers.push({ Authorization: "Bearer " + token });
		}
	}
	var variables = !isNullOrUndefined(paramsObject) ? JSON.stringify(paramsObject) : request.variables;
	if (request.callKind == GraphQLPost) {
		return new Promise(function (resolve, reject) {
			GraphqlPostAsync(request.url, request.body, variables, headers).then(function (res) { resolve(res.data); })
				.catch(function (error) { reject(error); });
		});
	}
	else if (request.callKind == GraphQLGet) {
		return new Promise(function (resolve, reject) {
			GraphqlGetAsync(request.url, request.body, variables, headers).then(function (res) { resolve(res.data); })
				.catch(function (error) { reject(error); });
		});
	}
	else if (request.callKind == RestGet) {
		return new Promise(function (resolve, reject) {
			httpGetAsync(request.url, request.requestBody, headers).then(function (res) {
				resolve(JSON.parse(res.responseText));
			}).catch(function (error) { reject(error); });
		});
	}
	return null;
}