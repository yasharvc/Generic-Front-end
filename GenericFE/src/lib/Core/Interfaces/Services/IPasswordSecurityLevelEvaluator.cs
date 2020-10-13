using Core.Enums;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
	public interface IPasswordSecurityLevelEvaluator
	{
		Task<PasswordStrength> PasswordSecurityLevel(string password);
	}
}