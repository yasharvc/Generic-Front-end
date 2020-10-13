using Core.Models;

namespace Models.Application
{
	public class JwtSettings : Model
	{
		public string Secret { get; set; }
		public string Audience { get; set; }
		public int ExpireInMinutes { get; set; }
		public string Issuer { get; set; }
	}
}