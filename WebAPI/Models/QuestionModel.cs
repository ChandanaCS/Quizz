using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace WebAPI.Models
{
    public class QuestionModel
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }

        [Required]
        public string QuestionText { get; set; }
        public int? ImageId { get; set; }
        public int QuestionTypeId { get; set; }
        public int CategoryId { get; set; }
        public DateTime? CreatedDate { get; set; }

        [DefaultValue(true)]
        public bool IsEnable { get; set; }
    }
}
