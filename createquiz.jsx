import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionModal from "./QuestionModel";
//import NavBar from "./Navbar";
import "./createquiz.css";

const CreateQuiz = () => {
  const [quizname, setQuizName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [organisations, setOrganisations] = useState([]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionToDisplay,setselectedQuestionToDisplay] = useState([]);

  const [selectedQuestionsList, setSelectedQuestionsList] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]); // State to store selected questions

  const calculateTotalMarks = () => {
    return selectedQuestions.reduce(
      (total, question) => total + parseInt(question.weightage || 0),
      0
    );
  };
  // const addSelectedQuestions = (selectedQuestions) => {
  //   setSelectedQuestions(selectedQuestions); // Store selected questions in state
  //   setselectedQuestionToDisplay(selectedQuestions);
  //   handleCloseModal(); // Close the modal
  // };

  // const addSelectedQuestions = (newlySelectedQuestions) => {
  //   // Merge the existing selected questions with the newly selected ones
  //   const updatedSelectedQuestions = [
  //     ...selectedQuestions,
  //     ...newlySelectedQuestions,
  //   ];
  //   setSelectedQuestions(updatedSelectedQuestions); // Update the state with the merged array
  //   // Other logic...
  //   setSelectedQuestionsList(selectedQuestions);
  //   console.log(selectedQuestions);
  //   console.log("Updated selectedQuestionsList:", updatedSelectedQuestions);
  // };

  const addSelectedQuestions = (newlySelectedQuestions) => {
    // Filter out newly selected questions that are already in selectedQuestions
    const uniqueNewlySelectedQuestions = newlySelectedQuestions.filter(
      (question) =>
        !selectedQuestions.some((selected) => selected.id === question.id)
    );

    // Merge the existing selected questions with the unique newly selected ones
    const updatedSelectedQuestions = [
      ...selectedQuestions,
      ...uniqueNewlySelectedQuestions,
    ];

    // Update the state with the merged array
    setSelectedQuestions(updatedSelectedQuestions);

    // Update selectedQuestionsList with the merged array
    setSelectedQuestionsList(updatedSelectedQuestions);

    console.log("Updated selectedQuestionsList:", updatedSelectedQuestions);
  };



  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    // Check if the end date is greater than the start date
    if (newEndDate > startDate) {
      setEndDate(newEndDate);
    } else {
      // If end date is not greater than start date, show error message or handle accordingly
      // For simplicity, let's just clear the end date field
      setEndDate("");
      alert("End date must be greater than start date");
    }
  };
  const handleWeightageChange = (e, index) => {
    const { value } = e.target;
    setSelectedQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, weightage: value } : question
      )
    );
  };

  const handleDeleteQuestion = (index) => {
    setSelectedQuestions((prevQuestions) => {
      const newSelectedQuestions = prevQuestions.filter(
        (question, i) => i !== index
      );
      console.log("Updated selected questions:", newSelectedQuestions);
      setSelectedQuestionsList(newSelectedQuestions);
      return newSelectedQuestions;
    });
  };

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setShowModal(true); // Show modal when category is selected

    try {
      const response = await axios.get(
        `https://localhost:7068/api/CreateQuiz/CategoryQuestions?categoryId=${categoryId}&organisationName=${organisation}`
      );
      setQuestions(response.data); // Assuming response.data is an array of questions
      const filteredSelectedQuestionsList = selectedQuestionsList.filter(
        (question) => question.categoryId === categoryId
      );
      setSelectedQuestionsList(filteredSelectedQuestionsList);
      setSelectedQuestionsList(selectedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQuestions([]);
    setSelectedCategory("");
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
    <>
      {/* <NavBar /> */}
      <br />
      <div className="container create-quiz-container">
        <h2 className="text-center">
          <strong>Create Quiz</strong>
        </h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-5">
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
            </div>
            <div className="form-group col-md-2">
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
            <div className="form-group col-md-5">
              <label htmlFor="name">
                <strong>Description</strong>
              </label>
              <input
                type="textarea"
                id="description"
                name="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group row">
              <div className="form-group col-md-2.4 md-7">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <br />
              <div className="form-group col-md-2 md-7">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  //onChange={(e) => setEndDate(e.target.value)}
                  onChange={handleEndDateChange}
                  required
                />
              </div>
              <div className="form-group col-md-2 md-7">
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

              <div className="form-group col-md-2">
                <label htmlFor="duration">Duration:</label>

                <input
                  type="time"
                  id="hours"
                  name="hours"
                  className="form-control"
                  placeholder="Hours"
                />
              </div>

              <div className="form-group col-md-4">
                <div className="form-check auto-validation ml-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="autovalidation"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                </div>
                <label
                  className="form-check-label float-right mr-5"
                  htmlFor="autovalidation"
                >
                  <strong>Auto Validation</strong>
                </label>
              </div>
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
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <br />
          <div>
            {selectedQuestions.length > 0 && (
              //<div className="container form-row">
              <div className="row justify-content-center">
                <h3>Selected Questions:</h3>
                <div className="col-md-12">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Question Text</th>
                        <th></th>
                        <th className="col-md-1 weightageForm">Weightage</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedQuestions.map((question, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{question.questionText}</td>
                          <td></td>
                          <td>
                            <input
                              type="number"
                              value={question.weightage}
                              onChange={(e) => handleWeightageChange(e, index)}
                              className="form-control mt-1"
                              min="0"
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-actions"
                              onClick={() => handleDeleteQuestion(index)}
                            >
                              <i class="fa-solid fa-lg fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    <div className="total-stats">
                      <strong>Total Questions: {selectedQuestions.length}</strong>
                    </div>
                    <div className="total-stats">
                      <strong>Total Marks: {calculateTotalMarks()}</strong>
                    </div>
                  </div>
                </div>
              </div>

              //</div>
            )}
          </div>
        </form>
        {/* </div> */}
        {/* </div> */}

        <QuestionModal
          show={showModal}
          handleClose={handleCloseModal}
          addSelectedQuestions={addSelectedQuestions} // Pass function to handle selected questions
          questions={questions}
          categoryId={selectedCategory}
          organisation={organisation}
          //selectedQuestions={selectedQuestions}
          setSelectedQuestions={setSelectedQuestions}
          selectedQuestionsList={selectedQuestionsList}
          setSelectedQuestionsList={setSelectedQuestionsList}
          //handleDeleteQuestion={handleDeleteQuestion}
        />
        {console.log(
          "selectedQuestionList from Createquiz",
          selectedQuestionsList
        )}
      </div>
    </>
  );
};

export default CreateQuiz;
