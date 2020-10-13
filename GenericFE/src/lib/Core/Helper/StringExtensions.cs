using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Core.Helper
{
	public static class StringExtensions
	{
		public static bool HasPunctaion(this string str) => str.Any(ch => char.IsPunctuation(ch));
		public static string MD5Hash(this string input)
		{
			StringBuilder hash = new StringBuilder();
			MD5CryptoServiceProvider md5provider = new MD5CryptoServiceProvider();
			byte[] bytes = md5provider.ComputeHash(new UTF8Encoding().GetBytes(input));

			for (int i = 0; i < bytes.Length; i++)
			{
				hash.Append(bytes[i].ToString("x2"));
			}
			return hash.ToString();
		}
		public static string SHA256Hash(this string rawData)
		{
			using (SHA256 sha256Hash = SHA256.Create())
			{
				byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));
				StringBuilder builder = new StringBuilder();
				for (int i = 0; i < bytes.Length; i++)
				{
					builder.Append(bytes[i].ToString("x2"));
				}
				return builder.ToString();
			}
		}

		public static bool IsJson(this string value) =>
			(value.StartsWith("{") && value.EndsWith("}"))
			|| (value.StartsWith("[") && value.EndsWith("]"));
	}
}
