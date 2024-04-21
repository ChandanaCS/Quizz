using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class CategoryModel
    {
            [Key]
            public int Id { get; set; }
            public string Name { get; set; }
    }
}
