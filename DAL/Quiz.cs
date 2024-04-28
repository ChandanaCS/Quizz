using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Quiz
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        [Required]
        public string Name { get; set; }
        [DefaultValue(true)]
        public bool AutoValidation { get; set; }
        [Required]
        public int OrganisationId { get; set; }
        public string Description { get; set; }
        public string QuizCategory { get; set; }
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public TimeSpan Duration { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public decimal TotalMarks { get; set; }
        [Required]
        public int TotalQuestion { get; set; }
        [DefaultValue(true)]
        public bool IsEnable { get; set; }
        public User User { get; set; }
    }
}
