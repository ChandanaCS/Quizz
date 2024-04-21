using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace DAL
{
    public class Question
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }

        [Required]
        public string QuestionText { get; set; }
        public int? ImageId { get; set; }
        public Image Image { get; set; }
        public int QuestionTypeId { get; set; }
        public QuestionType QuestionType { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public DateTime? CreatedDate { get; set; }

        [DefaultValue(true)]
        public bool IsEnable { get; set; }
    }
}
