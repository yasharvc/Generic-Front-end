using Core.Models;

namespace Models.Application
{
	public class ApplicationInfo : Model
	{
		public bool InMaintenance { get; set; }
		public string Title { get; set; }
		public string Copyright { get; set; }
		public string Desc { get; set; }
		public string UserId { get; set; }
		public string UserInfo { get; set; }
		public string LogoImageURL { get; set; }
		public i18n I18n { get; set; }
	}
}