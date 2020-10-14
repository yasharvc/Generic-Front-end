using Core.Enums;
using Core.Helper;

namespace Core.Exceptions.Security
{
	public class UserNotFoundException : SecurityException
	{
		public UserNotFoundException() : base(ErrorCodes.User_Not_Found.ToInt(), "User was not found") { }
	}
}