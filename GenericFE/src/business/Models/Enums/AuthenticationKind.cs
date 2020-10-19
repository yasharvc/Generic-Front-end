namespace Models.Enums
{
	public enum AuthenticationKind : int
	{
		None = 0,
		JwtToken = 1,
		OAuth = 2,
		OAuth2 = 3,
		LDAP = 4,
		Basic = 5
	}
}