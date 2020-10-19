var SimpleFunction = 0,
	AwaitableFunction = 1,
	RestPost = 2,
	RestGet = 3,
	GraphQLPost = 4,
	GraphQLGet = 5;

var None = 0,
	JwtToken = 1,
	OAuth = 2,
	OAuth2 = 3,
	LDAP = 4,
	Basic = 5;

function createRequest(callKind, url, body, variables, authKind, auth) {
	return {
		callKind: callKind,
		url: url,
		body: body,
		variables: variables,
		authenticationKind: authKind,
		authentication: auth
	};
}