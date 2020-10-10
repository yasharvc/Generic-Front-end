using System;

namespace Core.Helper
{
	public static class ConsoleExtensions
	{
		public static void ConsoleError(this Exception e)
		{
			var temp = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.Red;
			Console.WriteLine($"Error: {e.Message} - {(e.InnerException?.Message ?? "[No inner exception]")}");
			Console.ForegroundColor = temp;
		}
		public static void ConsoleWarning(this string str)
		{
			var temp = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.Yellow;
			Console.WriteLine(str);
			Console.ForegroundColor = temp;
		}
		public static void ConsoleSuccess(this string str)
		{
			var temp = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.Green;
			Console.WriteLine(str);
			Console.ForegroundColor = temp;
		}
		public static void ConsoleStart(this string str)
		{
			var temp = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.Magenta;
			Console.WriteLine(str);
			Console.ForegroundColor = temp;
		}
		public static void ConsoleFinish(this string str)
		{
			var temp = Console.ForegroundColor;
			Console.ForegroundColor = ConsoleColor.DarkMagenta;
			Console.WriteLine(str);
			Console.ForegroundColor = temp;
		}
	}
}