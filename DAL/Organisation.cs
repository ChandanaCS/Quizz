﻿using System.ComponentModel.DataAnnotations;

namespace DAL
{
    public class Organisation
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }
        public ICollection<User>? Users { get; set; } // Navigation property for Users in this Organisation
    }
}
