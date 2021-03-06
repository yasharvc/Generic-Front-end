using Core.Models.System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Models.Application;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using Core.Helper;

namespace GenericFrontEnd
{
	public class Program
	{
		public static IConfiguration EnvironmentConfiguration { get; set; }
		public static Configuration Configuration { get; set; } = new Configuration();
		public static JwtSettings JwtSettings { get; set; } = new JwtSettings();
		
		public static void Main(string[] args)
		{
			LoadConfiguration(args);
			CreateHostBuilder(args)
				.UseStartup<Startup>()
				.Build()
				.Run();
		}

		private static void LoadConfiguration(string[] args)
		{
			var path = Assembly.GetEntryAssembly().GetPath();
			EnvironmentConfiguration = new ConfigurationBuilder()
					.SetBasePath(path)
					.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
					.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true)
					.AddEnvironmentVariables()
					.AddCommandLine(args)
					.Build();
			LoadConfiguration();
		}

		private static void LoadConfiguration()
		{
			EnvironmentConfiguration.Bind(nameof(Configuration), Configuration);
			EnvironmentConfiguration.Bind(nameof(JwtSettings), JwtSettings);
		}

		public static IWebHostBuilder CreateHostBuilder(string[] args)
		{
			var res = WebHost.CreateDefaultBuilder(args)
				.UseUrls(Configuration.ListeningURL)
				.UseSockets()
				.UseKestrel((context,options )=>
					{
						options.Limits.MaxRequestBodySize = Configuration.MaxRequestBodySize;
					});

			return res;
		}
	}
}
