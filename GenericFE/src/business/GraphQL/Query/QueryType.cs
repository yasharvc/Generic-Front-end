using Core.Enums;
using Core.Exceptions;
using Core.Interfaces.Services;
using Core.Models.Data;
using GraphQL.Query.ReturnType.Simple;
using GraphQL.Query.ReturnType.Union.ObjectTypes;
using GraphQL.Query.ReturnType.Union.ReturnType;
using HotChocolate.Types;
using Models.Application;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GraphQL.Query
{
	public class QueryType : ObjectType<Query>
	{
		protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
		{
			AddApplicationInfo(descriptor);
			AddLogin(descriptor);
			AddAnonymousePage(descriptor);
			base.Configure(descriptor);
		}

		private void AddAnonymousePage(IObjectTypeDescriptor<Query> descriptor)
		{
			descriptor.Field("anonymousePage")
				.Type<AuthenticateUnionResult>()
				.Argument("email", (m) => m.Type<StringType>())
				.Argument("password", (m) => m.Type<StringType>())
				.Resolver(async ctx => {
					return await DoActionWithErrorTryAsync(async () =>
					{
						var authService = ctx.Service<IJwtAuthentication>();
						return new AuthenticateResult
						{
							Token = await authService.AuthenticateWithEmailPassword(
								ctx.Argument<string>("email"), ctx.Argument<string>("password"))
						};
					});
				});
		}

		private void AddLogin(IObjectTypeDescriptor<Query> descriptor)
		{
			descriptor.Field("login")
				.Type<AuthenticateUnionResult>()
				.Argument("email", (m) => m.Type<StringType>())
				.Argument("password", (m) => m.Type<StringType>())
				.Resolver(async ctx => {
					return await DoActionWithErrorTryAsync(async () =>
					{
						var authService = ctx.Service<IJwtAuthentication>();
						return new AuthenticateResult
						{
							Token = await authService.AuthenticateWithEmailPassword(
								ctx.Argument<string>("email"), ctx.Argument<string>("password"))
						};
					});
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

		private async Task<object> DoActionWithErrorTryAsync<T>(Func<Task<T>> function)
		{
			try
			{
				return await function();
			}
			catch (SecurityException securityException)
			{
				return new ErrorList
				{
					Errors = new List<Error> {
							new Error {
								Code = securityException.Code,
								Description=securityException.EnglishMessage,
								ErrorKind = ErrorKind.Security,
								LanguageLocale = LanguageLocale.EN_US
	}
}
				};
			}
			catch (Core.Exceptions.ApplicationException appException)
			{
				return new ErrorList
				{
					Errors = new List<Error> {
							new Error {
								Code = appException.Code,
								Description=appException.EnglishMessage,
								ErrorKind = ErrorKind.General,
								LanguageLocale = LanguageLocale.EN_US
							} }
				};
			}
			catch (System.Exception e)
			{
				return new ErrorList
				{
					Errors = new List<Error> {
							new Error {
								Code = -1,
								Description=$"{e.Message}{(e.InnerException != null ? "-" : "")}{e.InnerException?.Message ?? ""}",
								ErrorKind = ErrorKind.UnhandledException,
								LanguageLocale = LanguageLocale.EN_US
							} }
				};
			}
		}
	}
}
