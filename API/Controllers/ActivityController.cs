using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivityController :BaseApiController
    {
        [HttpGet] //api/activity
        [Route("getactivities")]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ctToken)
        {
            return await Mediator.Send(new List.Query(),ctToken);
        }
        //[Route("getactivities")]
        [HttpGet("{id}")]//api/activity/id
        public async Task<ActionResult<Activity>> GetActivity( Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok (await Mediator.Send(new Create.Command{Activity=activity}));
        }

        [HttpPut("{id}")]
        //[Route("editactivity")]
        public async Task<IActionResult>EditActivity(Guid id,Activity activity)
        {
            activity.Id =id;
            return Ok(await Mediator.Send(new Edit.Command{Activity=activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult>DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{ActivityId=id}));
        }
    }
}