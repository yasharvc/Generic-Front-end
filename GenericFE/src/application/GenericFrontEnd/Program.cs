using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace GenericFrontEnd
{
	public class Program
	{
		public async static Task Main(string[] args)
		{
			LoadConfiguration(args);
			CreateHostBuilder(args).Build().Run();
		}

		private static void LoadConfiguration(string[] args)
		{
			throw new NotImplementedException();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder =>
				{
					webBuilder.UseKestrel(options => {
						options.Limits.MaxRequestBodySize = 250000;
					});
					webBuilder.UseStartup<Startup>();
				});
	}
}
