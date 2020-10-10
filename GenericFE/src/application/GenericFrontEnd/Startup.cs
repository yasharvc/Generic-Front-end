using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Voyager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace GenericFrontEnd
{
	public class Startup
	{
		IWebHostEnvironment Environment { get; set; }
		IConfiguration EnvironmentConfiguration => Program.EnvironmentConfiguration;
		public Startup(IConfiguration configuration, IWebHostEnvironment env)
		{
			Environment = env;
		}


		public void ConfigureServices(IServiceCollection services)
		{
			AddBaseServices(services);
			AddMVCServices(services);
			new IoC().AddServices(services, EnvironmentConfiguration, Environment, Program.Configuration);
		}

		private void AddMVCServices(IServiceCollection services)
		{
			services.AddControllersWithViews();
			services.AddResponseCompression();
		}

		private void AddBaseServices(IServiceCollection services)
		{
			services.AddSingleton(Environment);
			services.AddSingleton(Program.Configuration);
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

			ConfigureCORSService(services);

			ConfigureHTTPSService(services);
			ConfigureSpa(services);
		}

		private void ConfigureSpa(IServiceCollection services) => services.AddSpaStaticFiles(configuration => configuration.RootPath = Program.Configuration.GetAbsoluteStaticFilePath());

		private void ConfigureCORSService(IServiceCollection services)
		{
			services.AddCors(options => {
				options.AddDefaultPolicy(
					builder => {
						builder
						.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader();
					});
			});
		}

		private void ConfigureHTTPSService(IServiceCollection services)
		{
			if (Program.Configuration.EnableHTTPS)
			{
				services.AddHsts(options =>
				{
					options.Preload = true;
					options.IncludeSubDomains = true;
					options.MaxAge = TimeSpan.FromDays(60);
				});


				if (!Environment.IsDevelopment())
				{
					services.AddHttpsRedirection(options =>
					{
						options.RedirectStatusCode = StatusCodes.Status308PermanentRedirect;
						options.HttpsPort = Program.Configuration.HTTPSPort;
					});
				}
				else
				{
					services.AddHttpsRedirection(options =>
					{
						options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
						options.HttpsPort = Program.Configuration.HTTPSPort;
					});
				}
			}
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.Use(async (ctx, next) =>
			{
				await next();
			});

			AuthenticationSetup(app);
			app.UseResponseCompression();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				if (Program.Configuration.EnableHTTPS)
					app.UseHsts();
			}

			if (Program.Configuration.EnableHTTPS)
				app.UseHttpsRedirection();

			app.UseWebSockets();
			UseGraphQL(app);

			UseCORS(app);

			app.UseRouting();

			UseStaticAndSPA(app);

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

		}

		private void UseGraphQL(IApplicationBuilder app)
		{
			app.UseGraphQL(Program.Configuration.GraphQLEndpoint)
			   .UseGraphiQL(Program.Configuration.GraphQLEndpoint)
			   .UsePlayground(Program.Configuration.GraphQLEndpoint)
			   .UseVoyager(Program.Configuration.GraphQLEndpoint);
		}

		private static void UseCORS(IApplicationBuilder app)
		{
			app.UseCors(option => option
						   .AllowAnyOrigin()
						   .AllowAnyMethod()
						   .AllowAnyHeader());
		}

		private static void UseStaticAndSPA(IApplicationBuilder app)
		{
			app.UseStaticFiles();
			app.UseSpaStaticFiles();
			app.UseSpaStaticFiles();
			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = Program.Configuration.StaticFilePath;
			});
		}

		private void AuthenticationSetup(IApplicationBuilder app)
		{
			app.UseAuthentication();
			app.UseAuthorization();
		}
	}
}
