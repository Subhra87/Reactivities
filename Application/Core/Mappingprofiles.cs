using AutoMapper;
using Domain;

namespace Application.Core
{
    public class Mappingprofiles :Profile
    {
        public Mappingprofiles()
        {
            CreateMap<Activity,Activity>();
        }
        
    }
}