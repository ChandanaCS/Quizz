using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace WebAPI.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? EmailId { get; set; }
        public string? Password { get; set; }
        public int OrganisationId { get; set; }
        public string? PhoneNo { get; set; }
        public bool IsApproved { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public int RoleName { get; set; }
        public bool IsEnable { get; set; }
    }
}
