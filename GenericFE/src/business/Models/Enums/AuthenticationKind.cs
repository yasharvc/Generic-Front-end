namespace Models.Enums
{
	public enum AuthenticationKind : int
	{
		None,
		JwtToken,
		OAuth,
		OAuth2,
		LDAP,
		Basic
	}
}