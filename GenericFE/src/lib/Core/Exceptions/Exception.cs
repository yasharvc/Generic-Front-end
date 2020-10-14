namespace Core.Exceptions
{
	public abstract class Exception : System.Exception, IException
	{
		public int Code { get; private set; }
		public string EnglishMessage { get; private set; }
		public Exception(int code, string englishMessage)
		{
			Code = code;
			EnglishMessage = englishMessage;
		}
		public Exception(int code) : this(code, "") { }
	}
}