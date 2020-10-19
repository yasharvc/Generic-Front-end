using GraphQL.Query.ReturnType.Union.Interfaces;
using GraphQL.Query.ReturnType.Union.ReturnType;
using HotChocolate.Types;

namespace GraphQL.Query.ReturnType.Union.ObjectTypes
{
	class PageInformationUnionResult : UnionType<IPageInformationUnion>
	{
		protected override void Configure(IUnionTypeDescriptor descriptor)
		{
			descriptor.Type<PageInformationResultType>();
			descriptor.Type<ErrorListType>();
			base.Configure(descriptor);
		}
	}
}