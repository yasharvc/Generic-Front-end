using Core.Helper;
using System.Diagnostics;
using System.IO;

namespace Core.Models.System
{
	public class Configuration : Model
	{
		public int MaxRequestBodySize { get; set; }
		public string StaticFilePath { get; set; }
		public string ListeningURL { get; set; }
		public bool EnableHTTPS { get; set; }
		public int HTTPSPort { get; set; }
		public string GetAbsoluteStaticFilePath()
		{
			if (Debugger.IsAttached)
				return StaticFilePath;
			var processModule = Process.GetCurrentProcess().MainModule;
			if (processModule != null)
			{
				string t2 = Path.GetDirectoryName(processModule.FileName)?.Trim();
				string t3 = !EnvironmentExtensions.IsInDocker()
					&& (!string.IsNullOrEmpty(t2) && !string.IsNullOrWhiteSpace(t2)) ?
					Path.Combine(t2 ?? "", StaticFilePath) :
					StaticFilePath;
				if (t3 == $"/{StaticFilePath}")
					t3 = StaticFilePath;
				return t3;
			}
			return StaticFilePath;
		}
	}
}