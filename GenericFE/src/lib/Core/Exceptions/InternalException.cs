namespace Core.Exceptions
{
	public abstract class InternalException : Exception, IException
	{
		protected InternalException(int code) : base(code) { }
		protected InternalException(int code, string englishMessage) : base(code, englishMessage) { }
	}
}