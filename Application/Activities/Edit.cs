using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using SQLitePCL;

namespace Application.Activities
{
    public class Edit
    {
        public class Command :IRequest
        {
            public Activity Activity {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
        public DataContext DataContext { get; }
        private readonly IMapper _mapper;
            public Handler( DataContext dataContext,IMapper mapper)
            {
             DataContext = dataContext;
              _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
               var activity= await DataContext.Activities.FindAsync(request.Activity.Id);
              _mapper.Map(request.Activity,activity);
               await DataContext.SaveChangesAsync();
               return Unit.Value;
            }
        }
    }
}