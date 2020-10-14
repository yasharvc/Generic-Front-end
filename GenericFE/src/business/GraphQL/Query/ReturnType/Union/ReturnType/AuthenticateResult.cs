using HotChocolate.Types;

namespace GraphQL.Query.ReturnType.Union.ReturnType
{
	class AuthenticateResult
	{
		public string Token { get; set; }
	}

	class AuthenticateResultType : ObjectType<AuthenticateResult> { }
}