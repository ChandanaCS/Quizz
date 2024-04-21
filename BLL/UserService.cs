using AutoMapper;
using DAL;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class UserService
    {
        private readonly IMapper? _mapper;
        private QuizDBContext context;
        public UserService(QuizDBContext context)
        {
            AutoMapperConfig.Initialize();
            _mapper = AutoMapperConfig.Mapper;
            this.context = context;
        }
        public Organisation GetOrganisationByName(string organisationName)
        {
            return context.Organisations.FirstOrDefault(o => o.Name == organisationName);
        }
        public bool IsEmailExists(string email)
        {
            // Query the database to check if a user with the given email exists
            return context.Users.Any(u => u.EmailId == email);
        }
        public bool RegisterNewUser(UserDTO userDTO)
        {
            UserDAL userDAL = new UserDAL(context);
            User user = _mapper.Map<User>(userDTO);
            bool result = userDAL.RegisterNewUser(user);
            return result;
        }
        public List<OrganisationDTO> GetOrganisations()
        {
            UserDAL userDAL = new UserDAL(context);
            List<Organisation> organisations = userDAL.GetOrganisation();
            List<OrganisationDTO> organisationDTOs = _mapper.Map<List<OrganisationDTO>>(organisations);
            return organisationDTOs;
        }
    }
}
