namespace Core.Exceptions
{
	public abstract class SecurityException : Exception, IException
	{
		protected SecurityException(int code) : base(code){}
		protected SecurityException(int code, string englishMessage) : base(code, englishMessage){}
	}
}