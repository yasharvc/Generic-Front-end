namespace Core.Exceptions
{
	public abstract class ApplicationException : Exception, IException
	{
		protected ApplicationException(int code) : base(code) { }
		protected ApplicationException(int code, string englishMessage) : base(code, englishMessage) { }
	}
}