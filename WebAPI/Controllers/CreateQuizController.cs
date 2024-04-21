using AutoMapper;
using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateQuizController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly CreateQuizService _createQuizService;
        public CreateQuizController(CreateQuizService createQuizService)
        {
            AutoMapperConfigAPI.Initialize();
            _mapper = AutoMapperConfigAPI.Mapper;
            _createQuizService = createQuizService;
        }
        [HttpGet("GetCategory")]
        public List<CategoryModel> GetCategories() 
        { 
            List<CategoryDTO> categoryDTOs = _createQuizService.GetCategories();
            List<CategoryModel> categoryModels = _mapper.Map<List<CategoryModel>>(categoryDTOs);
            return categoryModels;
        }
        [HttpGet("CategoryQuestions")]
        public List<QuestionModel> GetCategoryQuestions(int categoryId) 
        {
            List<QuestionDTO> questionDTOs = _createQuizService.GetCategoryQuestions(categoryId);
            List<QuestionModel> questionsModels = _mapper.Map<List<QuestionModel>>(questionDTOs);
            return questionsModels;
        }
    }
}
