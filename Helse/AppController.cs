using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace Helse
{
    [Route("api/[controller]")]
    public class AppController : Controller
    {

        // GET: api/<controller>
        [HttpGet]
        public async Task<object> Get(double latitude, double longitude)
        {
            var url = "http://data.helsenorge.no/healthservices?$top=10" +
                $"&latitude={latitude}&longitude={longitude}";

            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("http://api.openweathermap.org");
                    var response = await client.GetAsync(url);
                    response.EnsureSuccessStatusCode();
                    return await response.Content.ReadAsStringAsync();
                }
                catch (HttpRequestException httpRequestException)
                {
                    return BadRequest($"Error getting health data: {httpRequestException.Message}");
                }
            }
        }
    }
}
