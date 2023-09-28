using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command :IRequest
        {
            public Guid ActivityId { get; set; }
        }
        public class Handler :IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activitymodel = await _context.Activities.FindAsync(request.ActivityId);
                _context.Remove(activitymodel);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}