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
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://localhost:7068/api/CreateQuiz/CategoryQuestions?categoryId=${categoryId}`
        );
        const fetchedQuestions = response.data;
        setLoading(false);
        setFetchedQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    if (show) {
      fetchQuestions();
    }
  }, [show, categoryId]);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = fetchedQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleCheckboxChange = (e, questionId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedQuestions([...selectedQuestions, questionId]);
    } else {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== questionId));
    }
  };

  const handleAddQuestions = () => {
    addSelectedQuestions(selectedQuestions);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl" // Set modal size to extra-large
      centered
      className="question-modal"
    >
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">Select Questions</Modal.Title>
        <button className="close" onClick={handleClose}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {loading ? (
          <p>Loading questions...</p>
        ) : fetchedQuestions.length > 0 ? (
          <>
            <div className="question-list">
              {currentQuestions.map((question) => (
                <div key={question.id} className="question-item">
                  {question.isEnable && (
                    <>
                      <Form.Check
                        type="checkbox"
                        label={question.questionText}
                        value={question.id}
                        id={`question-${question.id}`}
                        checked={selectedQuestions.includes(question.id)}
                        onChange={(e) => handleCheckboxChange(e, question.id)}
                        style={{ fontSize: "18px" }}
                      />
                      {question.imageId && (
                        <img
                          src={`https://your-api-url/images/${question.imageId}`}
                          alt="Question Image"
                          className="question-image"
                        />
                      )}
                    </>
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
      <Modal.Footer className="modal-footer">
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
