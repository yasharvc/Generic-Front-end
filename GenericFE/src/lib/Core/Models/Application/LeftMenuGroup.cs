﻿using System.Collections.Generic;

namespace Core.Models.Application
{
	public class LeftMenuGroup : Model
	{
		public string GroupName { get; set; }
		public string Title { get; set; }
		public string Icon { get; set; }
		public List<LeftMenuItem> Items { get; set; }
	}
}