namespace Core.Models.System
{
	public class Configuration : Model
	{
		public int MaxRequestBodySize { get; set; }
		public string StaticFilePath { get; set; }
		public string ListeningURL { get; set; }
		public bool EnableHTTPS { get; set; }
		public int HTTPSPort { get; set; }
	}
}