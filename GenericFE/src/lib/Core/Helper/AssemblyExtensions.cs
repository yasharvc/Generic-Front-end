using System;
using System.IO;

namespace Core.Helper
{
    public static class AssemblyExtensions
    {
        public static string GetPath(this System.Reflection.Assembly assembly){
            UriBuilder uri = new UriBuilder(assembly.CodeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }
    }
}