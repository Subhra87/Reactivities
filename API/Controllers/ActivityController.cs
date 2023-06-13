using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivityController :BaseApiController
    {
        private readonly DataContext _context;
      
        public ActivityController(DataContext context )
        {
            _context = context;
        }

        [HttpGet] //api/activity
        [Route("getactivities")]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await _context.Activities.ToListAsync();
        }
        //[Route("getactivities")]
        [HttpGet("{id}")]//api/activity/id
        public async Task<ActionResult<Activity>> GetActivity( Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }
    }
}