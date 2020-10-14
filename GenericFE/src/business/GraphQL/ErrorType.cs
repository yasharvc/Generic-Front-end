using Core.Models.Data;
using HotChocolate.Types;
using System.Collections.Generic;

namespace GraphQL
{

	class ErrorList
	{
		public IEnumerable<Error> Errors { get; set; }
	}
	class ErrorType : ObjectType<ErrorList>
	{
		protected override void Configure(IObjectTypeDescriptor<ErrorList> descriptor)
		{
			base.Configure(descriptor);
		}
	}
}