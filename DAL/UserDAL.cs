using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class UserDAL
    {
        private QuizDBContext context;
        public UserDAL(QuizDBContext context)
        {
            this.context = context;
        }
        public bool RegisterNewUser(User user)
        {
            context.Users.Add(user);
            int result = context.SaveChanges();
            if(result != 0) 
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public List<Organisation> GetOrganisation()
        {
             return context.Organisations.ToList();
        }
    }
}
