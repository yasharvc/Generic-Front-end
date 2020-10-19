namespace Models.Enums
{
	public enum CallKind : int
	{
		SimpleFunction = 0,
		AwaitableFunction = 1,
		RestPost = 2,
		RestGet = 3,
		GraphQLPost = 4,
		GraphQLGet = 5
	}
}