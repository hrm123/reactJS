using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using mongodb101.DAL;

namespace mongodb101.Controllers
{
    public class ToDosController : ApiController
    {
        // GET: api/ToDos
        public IEnumerable<ToDo> Get()
        {
            return (new ToDo[] { new ToDo { TaskDescription="task1" },new ToDo { TaskDescription = "task2" } }).AsEnumerable<ToDo>();
        }

        // GET: api/ToDos/5
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/ToDos
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ToDos/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ToDos/5
        public void Delete(int id)
        {
        }
    }
}
