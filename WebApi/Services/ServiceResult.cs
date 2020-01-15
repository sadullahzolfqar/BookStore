using System.Collections.Generic;

namespace WebApi.Services
{
    public class ServiceResult
    {
        public object data{ get; set; }
        public string message{get;set;}
        public bool result { get; set; }
    }
}