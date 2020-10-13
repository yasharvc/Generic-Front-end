using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
	public interface IJwtAuthentication
	{
		Task<string> AuthenticateWithEmailPassword(string email, string password);
	}
}