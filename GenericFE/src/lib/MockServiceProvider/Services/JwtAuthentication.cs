using Core.Exceptions.Security;
using Core.Helper;
using Core.Interfaces.Services;
using Microsoft.IdentityModel.Tokens;
using Models.Application;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MockServiceProvider.Services
{
	public class JwtAuthentication : IJwtAuthentication
	{
		Dictionary<string,string> Users { get; }
		JwtSettings JwtSettings { get; }
		public JwtAuthentication(JwtSettings jwtSettings)
		{
			Users = new Dictionary<string, string>
			{
				{ "yashar@tribitgroup.com","123".SHA256Hash() },
				{ "john@doe.com","456".SHA256Hash() },
			};
			JwtSettings = jwtSettings;
		}
		public async Task<string> AuthenticateWithEmailPassword(string email, string password)
		{
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Secret));
			var jwtValidity = DateTime.Now.AddMinutes(Convert.ToDouble(JwtSettings.ExpireInMinutes));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			List<Claim> claims = await GetUserClaims(email, password);

			var token = new JwtSecurityToken(
						issuer: JwtSettings.Issuer,
						audience: JwtSettings.Audience,
						expires: jwtValidity,
						claims: claims,
						signingCredentials: creds);

			var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

			return tokenStr;
		}

		private async Task<List<Claim>> GetUserClaims(string user, string password)
		{
			return await Task.Run(() => {
				if (Users.ContainsKey(user) && Users[user] == password.SHA256Hash())
					return new List<Claim> { new Claim(ClaimTypes.Role, "ADMINISTRATOR") };
				throw new UserNotFoundException();
			});
		}
	}
}
