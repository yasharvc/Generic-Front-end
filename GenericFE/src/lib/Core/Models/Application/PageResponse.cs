﻿using System.Collections.Generic;

namespace Core.Models.Application
{
	public class PageResponse : Model
	{
		public List<LeftMenuGroup> LeftMenu { get; set; }
		public List<RightMenuItem> RightMenu { get; set; }
		public List<TabInformation> StartupTabs { get; set; }
		public List<string> PostRenderMenuIdsToClick { get; set; }
	}
}