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
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Models.Application;
using Microsoft.AspNetCore.DataProtection;
using System.Security.Claims;

namespace GenericFrontEnd
{
	sealed class IoC
	{
		private JwtSettings JwtSettings { get; set; } = new JwtSettings();
		private Configuration Configuration { get; set; } = new Configuration();
		public void AddServices(
			IServiceCollection services,
			IConfiguration webConfiguration,
			IWebHostEnvironment environment,
			Configuration configuration)
		{
			"Starting of adding services".ConsoleStart();

			"Adding Configuration".ConsoleWarning();
			AddConfiguration(services, webConfiguration);
			"Configure Authorization".ConsoleWarning();
			AuthorizationSetup(services, webConfiguration, configuration);
			"Configure GraphQL".ConsoleWarning();
			AddGgraphQL(services,webConfiguration);
		}

		private void AuthorizationSetup(IServiceCollection services, IConfiguration webConfiguration, Configuration configuration)
		{
			services.AddSingleton(JwtSettings);
			services.AddQueryRequestInterceptor((ctx, builder, ct) => AddExtraAuthroziationData(ctx));
			services
				.AddAuthentication(x =>
				{
					x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
					x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				})
				.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme,
				options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = false,
						ValidateAudience = false,
						ValidateIssuerSigningKey = false,
						SaveSigninToken = false,
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Secret))
					};

				});
			services.AddAuthorization();
			services.AddDataProtection()
					.SetDefaultKeyLifetime(TimeSpan.FromDays(14));
		}

		private void AddConfiguration(IServiceCollection services, IConfiguration configuration)
		{
			configuration.Bind(nameof(Configuration), Configuration);
			configuration.Bind(nameof(JwtSettings), JwtSettings);
			services.Configure<Configuration>(configuration.GetSection(nameof(Configuration)));
			services.Configure<JwtSettings>(configuration.GetSection(nameof(JwtSettings)));
			services.AddSingleton(Configuration);
			services.AddSingleton(JwtSettings);
		}

		private static Task AddExtraAuthroziationData(HttpContext ctx)
		{
			var identity = new ClaimsIdentity();
			identity.AddClaim(new Claim(ClaimTypes.Role, "test"));
			ctx.User.AddIdentity(identity);
			return Task.CompletedTask;
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
