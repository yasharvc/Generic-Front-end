﻿using Core.Enums;
using Core.Models;

namespace Models.Application
{
	public class LeftMenuItem : Model
	{
		public int Title { get; set; }
		public string Icon { get; set; }
		public LeftMenuItemKind Kind { get; set; }
		public string Link { get; set; }
	}
}