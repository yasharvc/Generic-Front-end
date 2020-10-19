namespace Models.Enums
{
	public enum CallKind : int
	{
		SimpleFunction,
		AwaitableFunction,
		RestPost,
		RestGet,
		GraphQLPost,
		GraphQLGet
	}
}