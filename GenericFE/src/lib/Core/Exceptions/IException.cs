namespace Core.Exceptions
{
	public interface IException
	{
		int Code { get; }
		string EnglishMessage { get; }
	}
}