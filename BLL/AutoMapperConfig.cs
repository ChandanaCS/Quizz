using AutoMapper;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class AutoMapperConfig
    {
        public static IMapper? Mapper { get; private set; }
        public static void Initialize()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDTO>();
                cfg.CreateMap<UserDTO, User>();
                cfg.CreateMap<Organisation,OrganisationDTO>();
                cfg.CreateMap<OrganisationDTO, Organisation>();
                cfg.CreateMap<Category, CategoryDTO>();
                cfg.CreateMap<CategoryDTO, Category>();
                cfg.CreateMap<Question, QuestionDTO>();
                cfg.CreateMap<QuestionDTO, Question>();
            });

            Mapper = config.CreateMapper();

        }

    }
}
