using Core.Enums;

namespace Core.Helper
{
	public static class EnumsExtensions
	{
		public static int ToInt(this ErrorCodes e){
			return (int)e;
		}
	}
}