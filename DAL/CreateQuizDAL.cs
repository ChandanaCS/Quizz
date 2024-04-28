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
        //public List<Question> GetCategoryQuestions(int categoryId, string organisation)
        public List<Question> GetCategoryQuestions(int categoryId, string organisation)
        {
            Organisation org = context.Organisations.FirstOrDefault(o => o.Name == organisation);
            //return context.QuizzifyQuestions
            //          .Where(qq => qq.CategoryId == categoryId)
            //          .ToList();
            var query = from qq in context.QuizzifyQuestions
                        join u in context.Users on qq.UserId equals u.Id
                        where (u.OrganisationId == org.Id && qq.CategoryId == categoryId)
                        select qq;

            var result = query.ToList();
            return result;
        }
    }
}
