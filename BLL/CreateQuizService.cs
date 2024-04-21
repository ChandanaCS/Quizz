using AutoMapper;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class CreateQuizService
    {
        private readonly IMapper? _mapper;
        private QuizDBContext context;
        public CreateQuizService(QuizDBContext context)
        {
            AutoMapperConfig.Initialize();
            _mapper = AutoMapperConfig.Mapper;
            this.context = context;
        }
        public List<CategoryDTO> GetCategories()
        {
            CreateQuizDAL createQuizDAL = new CreateQuizDAL(context);
            List<Category> categories = createQuizDAL.GetCategories();
            List<CategoryDTO> caregoryDTOs = _mapper.Map<List<CategoryDTO>>(categories);
            return caregoryDTOs;
        }
        public List<QuestionDTO> GetCategoryQuestions(int categoryId)
        {
            CreateQuizDAL createQuizDAL = new CreateQuizDAL(context);
            List<Question> questions = createQuizDAL.GetCategoryQuestions(categoryId);
            List<QuestionDTO> questionDTOs = _mapper.Map<List<QuestionDTO>>(questions);
            return questionDTOs;
        }
    }
}
