using Core.Enums;

namespace Core.Models.Application
{
	public class LeftMenuItem : Model
	{
		public int Title { get; set; }
		public string Icon { get; set; }
		public LeftMenuItemKind Kind { get; set; }
		public string Link { get; set; }
	}
}