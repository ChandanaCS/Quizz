using AutoMapper;
using BLL;
using DAL;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowReactApp")]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly UserService _userService;
        public UserController(UserService userService) 
        {
            AutoMapperConfigAPI.Initialize();
            _mapper = AutoMapperConfigAPI.Mapper;
            _userService = userService;
        }
        [HttpPost("RegisterForm")]
        [EnableCors("AllowReactApp")]
        public IActionResult RegisterNewUser(String Name, String EmailId, String  Password, String OrganisationName
            , string PhoneNo)
        {
            try
            {
                if (_userService.IsEmailExists(EmailId))
                {
                    return Conflict("Email ID already exists");
                }
                var userDTO = new UserDTO
                {
                    Name = Name,
                    EmailId = EmailId,
                    Password = Password,
                    PhoneNo = PhoneNo
                };
                Organisation organisation = _userService.GetOrganisationByName(OrganisationName);
                userDTO.OrganisationId = organisation.Id;
                userDTO.IsEnable = true;
                bool result = _userService.RegisterNewUser(userDTO);
                if (result)
                {
                    return Ok("Data Inserted");
                }
                else
                {
                    return BadRequest("Something went wrong try again ");
                }
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetOrganisation")]
        public List<OrganisationModel> GetOrganisation()
        {
            List<OrganisationDTO> organisationDTO = _userService.GetOrganisations();
            List<OrganisationModel> organisationModels = _mapper.Map<List<OrganisationModel>>(organisationDTO);
            return organisationModels;

        }
    }
}
