using GraphQL.Query.ReturnType.Union.Interfaces;
using GraphQL.Query.ReturnType.Union.ReturnType;
using HotChocolate.Types;

namespace GraphQL.Query.ReturnType.Union.ObjectTypes
{
	class AuthenticateUnionResult : UnionType<IAuthenticateUnion>
	{
		protected override void Configure(IUnionTypeDescriptor descriptor)
		{
			descriptor.Type<AuthenticateResultType>();
			descriptor.Type<ErrorType>();
			base.Configure(descriptor);
		}
	}
}