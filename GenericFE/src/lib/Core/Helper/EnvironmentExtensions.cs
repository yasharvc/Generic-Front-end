using System;
using System.Runtime.InteropServices;

namespace Core.Helper
{
	public static class EnvironmentExtensions
	{
		public static bool IsInDocker(this object obj) 
			=> Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";

		public static bool IsWindows(this object obj) => RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
		public static bool IsNonWindows(this object obj) => !IsWindows(obj);
		public static bool IsLinux(this object obj) => RuntimeInformation.IsOSPlatform(OSPlatform.Linux);
		public static bool IsNonLinux(this object obj) => !IsLinux(obj);

		public static bool IsMac(this object obj) => RuntimeInformation.IsOSPlatform(OSPlatform.OSX);
		public static bool IsNonMac(this object obj) => !IsMac(obj);

	}
}