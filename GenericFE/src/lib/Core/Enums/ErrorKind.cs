namespace Core.Enums
{
	public enum ErrorKind : int
	{
		General = 0,
		Internal = 10,
		UnhandledException = 20,
		Security = 30
	}
}