using Core.Models;

namespace Models.Application
{
	public class LeftMenuTabProperties : Model
	{
		public string Title { get; set; }
		public string Icon { get; set; }
		public bool Closable { get; set; }
		public Request Request { get; set; }
	}
}