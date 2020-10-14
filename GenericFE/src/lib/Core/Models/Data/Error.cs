using Core.Enums;

namespace Core.Models.Data
{
	public class Error : Model
	{
		public ErrorKind ErrorKind { get; set; }
		public string Description { get; set; }
		public int Code { get; set; }
		public LanguageLocale LanguageLocale { get; set; }
	}
}