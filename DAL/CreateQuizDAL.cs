using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class CreateQuizDAL
    {
        private QuizDBContext context;
        public CreateQuizDAL(QuizDBContext context)
        {
            this.context = context;
        }
        public List<Category> GetCategories()
        {
            return context.QuizzifyCategories.ToList();
        }
        //return context.Organisations.FirstOrDefault(o => o.Name == organisationName);
        public List<Question> GetCategoryQuestions(int categoryId)
        {
            return context.QuizzifyQuestions
                      .Where(qq => qq.CategoryId == categoryId)
                      .ToList();
        }
    }
}
