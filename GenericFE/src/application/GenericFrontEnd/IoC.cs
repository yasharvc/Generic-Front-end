using Core.Models.System;
using Core.Helper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using HotChocolate.Subscriptions;
using GraphQL.Server;
using HotChocolate;
using GraphQL.Query;

namespace GenericFrontEnd
{
	sealed class IoC
	{
		public void AddServices(
			IServiceCollection services,
			IConfiguration webConfiguration,
			IWebHostEnvironment environment,
			Configuration configuration)
		{
			"Starting of adding services".ConsoleStart();
			"Configure GraphQL".ConsoleWarning();
			AddGgraphQL(services,webConfiguration);
		}

		private void AddGgraphQL(IServiceCollection services, IConfiguration webConfiguration)
		{
			services.AddInMemorySubscriptionProvider();
			services.AddGraphQL(sp =>
				SchemaBuilder.New()
				.AddServices(sp)
				.AddAuthorizeDirectiveType()
				.AddQueryType<QueryType>()
				.Create()
			);
		}
	}
}
