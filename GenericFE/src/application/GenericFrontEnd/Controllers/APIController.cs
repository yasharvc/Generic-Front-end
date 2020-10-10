using Microsoft.AspNetCore.Mvc;
using Models.Application;

namespace GenericFrontEnd.Controllers
{
	public class APIController : Controller
	{
		[HttpGet]
		public IActionResult ApplicationInfo()
		{
			var obj = new ApplicationInfo
			{
				InMaintenance = false,
				Title = "ACCOUNTING",
				Copyright = "copyright by phigaro 2020".ToUpper(),
				Desc = "BY PHIGARO",
				UserId = "Yashar",
				UserInfo = "Software Engineer",
				LogoImageURL = "/images/Tribit.png",
				I18n = new i18n
				{
					Lang = 1065,
					Translate = true
				}
			};
			return Json(obj);
		}
	}
}