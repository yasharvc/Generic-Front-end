using System;

namespace Core.Exceptions
{
	public abstract class ApplicationException : Exception
	{
		public int Code { get; set; }
	}
}