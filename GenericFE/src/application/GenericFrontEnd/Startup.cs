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
		public Startup(IConfiguration configuration, IWebHostEnvironment env)
		{
			Environment = env;
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllersWithViews();
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = Program.Configuration.StaticFilePath;
			});
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
			//app.UseResponseCompression();

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

			if(Program.Configuration.EnableHTTPS)
				app.UseHttpsRedirection();
			app.UseWebSockets();
			//Graphql setup

			app.UseCors(option => option
			   .AllowAnyOrigin()
			   .AllowAnyMethod()
			   .AllowAnyHeader());

			app.UseRouting();

			app.UseStaticFiles();
			app.UseSpaStaticFiles();


			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

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
