using System;
using System.Runtime.InteropServices;

namespace Core.Helper
{
	public static class EnvironmentExtensions
	{
		public static bool IsInDocker() 
			=> Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";

		public static bool IsWindows() => RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
		public static bool IsNonWindows() => !IsWindows();

		public static bool IsLinux() => RuntimeInformation.IsOSPlatform(OSPlatform.Linux);
		public static bool IsNonLinux() => !IsLinux();

		public static bool IsMac() => RuntimeInformation.IsOSPlatform(OSPlatform.OSX);
		public static bool IsNonMac() => !IsMac();

	}
}