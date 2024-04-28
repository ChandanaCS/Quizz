import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./questionmodel.css";

const QuestionModal = ({
  show,
  handleClose,
  addSelectedQuestions,
  questions,
  categoryId,
  selectedQuestionsList,
  setSelectedQuestionsList,
  organisation,
  //selectedQuestions,
  //setSelectedQuestions
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [chosenQuestions, setChosenQuestions] = useState([]);
  const questionsPerPage = 10;

  useEffect(() => {
    {
      console.log(
        "selectedQuestionList from QUestionModel",
        selectedQuestionsList
      );
    }
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7068/api/CreateQuiz/CategoryQuestions?categoryId=${categoryId}&organisationName=${organisation}`
        );
        const fetchedQuestions = response.data;
        setLoading(false);
        setFetchedQuestions(fetchedQuestions);
        console.log("Selected Questions List:", selectedQuestionsList);

        const questionIds = selectedQuestionsList.map(
          (question) => question.id
        );
        setSelectedQuestions(questionIds);
        console.log("Selected Questions -> questionIds:", questionIds);

        console.log("Selected Questions: -> ", selectedQuestions);
        const updatedChosenQuestions = fetchedQuestions.filter((question) =>
          questionIds.includes(question.id)
        );
        setChosenQuestions(updatedChosenQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    if (show) {
      fetchQuestions();
    }
  }, [show, categoryId, selectedQuestionsList, organisation]);

  const handleCheckboxChange = (e, questionId, question) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedQuestions([...selectedQuestions, questionId]);
      setChosenQuestions([...chosenQuestions, question]);
    } else {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
      setChosenQuestions(chosenQuestions.filter((q) => q.id !== questionId));
    }
  };

  const handleQuestionItemClick = (e, questionId, question) => {
    const isChecked = selectedQuestions.includes(questionId);
    if (isChecked) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
      setChosenQuestions(chosenQuestions.filter((q) => q.id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
      setChosenQuestions([...chosenQuestions, question]);
    }
  };

  // const handleAddQuestions = () => {
  //   addSelectedQuestions(chosenQuestions);
  //   chosenQuestions.forEach((question) => {
  //     console.log(question);
  //   });
  //   handleClose();
  // };

  const handleAddQuestions = () => {
    const updatedQuestionsList = [...selectedQuestions, ...chosenQuestions];
    setSelectedQuestions(updatedQuestionsList);
    addSelectedQuestions(chosenQuestions);
    handleClose();
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = fetchedQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl"
      centered
      className="question-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading questions...</p>
        ) : fetchedQuestions.length > 0 ? (
          <>
            <div className="question-list">
              {currentQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className={`question-item ${
                    selectedQuestions.includes(question.id) ? "selected" : ""
                  }`}
                  onClick={(e) => {
                    var count = 0;
                    console.log("onclick called");
                    const isCheckboxClicked =
                      e.target.tagName.toLowerCase() === "input";
                    if (!isCheckboxClicked) {
                      e.preventDefault();
                      e.stopPropagation();
                    }

                    const isTextClicked =
                      e.target.className.includes("question-text");

                    if (isTextClicked) {
                      count++;
                      console.log(count);
                      handleQuestionItemClick(e, question.id, question);
                      console.log("handleQuestionItemClick");
                    } else {
                      count++;
                      console.log(count);
                      handleCheckboxChange(e, question.id, question);
                      console.log("handleCheckboxChange");
                    }
                  }}
                >
                  {question.isEnable && (
                    <div className="question-text">
                      <Form.Check
                        type="checkbox"
                        id={`question-${question.id}`}
                        checked={selectedQuestions.includes(question.id)}
                        onChange={() => {}}
                        label={
                          <div className="question-content">
                            <span className="question-text">
                              {question.questionText}
                            </span>
                            {question.imageId && (
                              <img
                                src={
                                  "https://your-api-url/images/${question.imageId}"
                                }
                                alt="Question Image"
                                className="question-image"
                              />
                            )}
                            {/* <span className="created-by">
                              Created by:{" "}
                              <span className="lighter-text">
                                {question.CreatedBy}
                              </span>
                            </span> */}
                          </div>
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <nav className="d-flex justify-content-center">
              <ul className="pagination pagination-sm">
                {Array.from(
                  {
                    length: Math.ceil(
                      fetchedQuestions.length / questionsPerPage
                    ),
                  },
                  (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        onClick={() => paginate(i + 1)}
                        className="page-link"
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </>
        ) : (
          <p>No questions available</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddQuestions}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionModal;
