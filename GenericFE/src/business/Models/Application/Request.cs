using Core.Models;
using Models.Enums;
using System.Collections.Generic;

namespace Models.Application
{
	public class Request : Model
	{
		public CallKind CallKind { get; set; }
		public string Url { get; set; }
		public string Body { get; set; }
		public string Variables { get; set; }
		public AuthenticationKind AuthenticationKind { get; set; }
		public Dictionary<string,string> Authentication { get; set; }
	}
}