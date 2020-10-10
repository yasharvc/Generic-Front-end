using GraphQL.Query.ReturnType.Simple;
using HotChocolate.Types;
using Models.Application;
using System;
using System.Collections.Generic;
using System.Text;

namespace GraphQL.Query
{
	public class QueryType : ObjectType<Query>
	{
		protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
		{
			AddApplicationInfo(descriptor);
			base.Configure(descriptor);
		}

		private void AddApplicationInfo(IObjectTypeDescriptor<Query> descriptor)
		{
			descriptor.Field("applicationInfo")
				.Type<ApplicationInfoType>()
				.Resolver(ctx => {
					return new ApplicationInfo
					{
						InMaintenance = false,
						Title = "ACCOUNTING",
						Copyright = "copyright by phigaro 2020".ToUpper(),
						Desc = "BY PHIGARO",
						UserId = "Yashar",
						UserInfo = "From GraphQL!",
						LogoImageURL = "/images/Tribit.png",
						I18n = new i18n
						{
							Lang = 1033,
							Translate = true
						}
					};
				});
		}
	}
}
