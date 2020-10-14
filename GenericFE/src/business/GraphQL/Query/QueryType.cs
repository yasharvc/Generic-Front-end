using Core.Exceptions;
using Core.Interfaces.Services;
using GraphQL.Query.ReturnType.Simple;
using GraphQL.Query.ReturnType.Union.ReturnType;
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
			AddLogin(descriptor);
			base.Configure(descriptor);
		}

		private void AddLogin(IObjectTypeDescriptor<Query> descriptor)
		{
			descriptor.Field("login")
				.Type<AuthenticateResultType>()
				.Argument("email", (m) => m.Type<StringType>())
				.Argument("password", (m) => m.Type<StringType>())
				.Resolver(async ctx => {
					var authService = ctx.Service<IJwtAuthentication>();
					try
					{

					}catch(Core.Exceptions.ApplicationException appException)
					{

					}
					catch(Exception e) 
					{
						return Error()
					}
				});
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
