import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionModal from "./QuestionModel";

const CreateQuiz = () => {
  const [quizname, setQuizName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [organisations, setOrganisations] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setShowModal(true); // Show modal when category is selected

    try {
      const response = await axios.get(
        `https://localhost:7068/api/CreateQuiz/CategoryQuestions?categoryId=${categoryId}`
      );
      setQuestions(response.data); // Assuming response.data is an array of questions
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQuestions([]); 
  };

  const dummyCategories = [
    { id: 1, name: "Science" },
    { id: 2, name: "History" },
    { id: 3, name: "Mathematics" },
    { id: 4, name: "General Knowledge" },
  ];

  const addSelectedQuestions = (selectedQuestions) => {
    // Handle the logic to add selected questions to your quiz state or perform any other action
    console.log("Selected Questions:", selectedQuestions);
    // Example: Update state to store selected questions
  };

  const handleSubmit = async (e) => {};
  const handleOrganisationChange = (e) => {
    setOrganisation(e.target.value);
  };
  useEffect(() => {
    // Fetch organisations and categories from backend
    const fetchOrganisations = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7068/api/user/GetOrganisation"
        );
        setOrganisations(response.data); // Assuming response.data is an array of organisations
      } catch (error) {
        console.error("Error fetching organisations:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7068/api/CreateQuiz/GetCategory"
        );
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchOrganisations();
    fetchCategories();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-right">
        <div className="col-md-5 d-flex flex-column">
          <h2 className="text-center">
            <strong>Create Quiz</strong>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                <strong>Quiz Name</strong>
              </label>
              <input
                type="text"
                id="quizname"
                name="quizname"
                className="form-control"
                placeholder="Enter Quiz Name"
                value={quizname}
                onChange={(e) => setQuizName(e.target.value)}
                required
                autoFocus
              />
              <br />
            </div>
            <div className="col-md-5">
              <div className="form-group">
                <label htmlFor="organisation">
                  <strong>Organisation:</strong>
                </label>
                <select
                  className="form-control"
                  id="organisation"
                  value={organisation}
                  onChange={handleOrganisationChange}
                  required
                >
                  <option value="">Select Organisation</option>
                  {organisations.map((org) => (
                    <option key={org.id} value={org.name}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">
                <strong>Tags</strong>
              </label>
              <input type="textarea" required autoFocus />
              <br />
            </div>
            <div className="form-group row">
              <div className="col-sm-8 offset-sm-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autovalidation"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label className="form-check-label" htmlFor="autovalidation">
                    <strong>Auto Validation</strong>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="level">Level:</label>
                  <select
                    className="form-control"
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    required
                  >
                    <option value="">Select Level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration (in minutes):</label>
                  <br />
                  <label for="hours">Hours:</label>
                  <input
                    type="number"
                    id="hours"
                    name="hours"
                    min="0"
                    max="12"
                    step="1"
                    placeholder="Hours"
                  />
                  <label for="minutes">Minutes:</label>
                  <input
                    type="number"
                    id="minutes"
                    name="minutes"
                    min="0"
                    max="59"
                    step="1"
                    placeholder="minutes"
                  />

                  {/* <input
                  type="number"
                  className="form-control"
                  id="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                /> */}
                </div>
                <div className="form-group">
                  <label htmlFor="category">
                    <strong>Category</strong>
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    // onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="category">
                    <strong>Category</strong>
                  </label>
                  <select
                    className="form-control"
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {dummyCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <QuestionModal
        show={showModal}
        handleClose={handleCloseModal}
        questions={questions}
      />
    </div>
  );
};

export default CreateQuiz;
