import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const QuestionModal = ({
  show,
  handleClose,
  addSelectedQuestions,
  questions, // This prop will contain the array of questions passed from the parent component
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(5); // Number of questions per page
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
    
                      console.log(questions.QuestionText);
//   useEffect(() => {
//     // This effect will run whenever 'show' prop changes (i.e., when modal is shown/hidden)
//     const fetchQuestions = async () => {
//       try {
//         setLoading(true);
//         // Make an API request to fetch questions from the backend based on category
//         // Adjust the API endpoint to match your backend endpoint for fetching questions
//         const response = await axios.get(
//           `https://localhost:7068/api/CreateQuiz/CategoryQuestions`
//         );
//         const fetchedQuestions = response.data;
//         setLoading(false);
//         // Filter questions to display only if IsEnable is true
//         const enabledQuestions = fetchedQuestions.filter(
//           (question) => question.IsEnable
//         );
//         setFetchedQuestions(enabledQuestions);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//         setLoading(false);
//       }
//     };

//     if (show) {
//       fetchQuestions();
//     }
//   }, [show]); // Only fetch questions when modal is shown

  // Handle pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = fetchedQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle checkbox selection
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
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Questions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading questions...</p>
        ) : fetchedQuestions.length > 0 ? (
          <>
            {currentQuestions.map((question) => (
              <div key={question.id} className="mb-3">
                {question.IsEnable && ( // Render question if IsEnable is true
                  <>
                    <Form.Check
                      type="checkbox"
                      label={question.QuestionText}
                      id={`question-${question.id}`}
                      checked={selectedQuestions.includes(question.id)}
                      onChange={(e) => handleCheckboxChange(e, question.id)}
                    />
                    {question.ImageId && ( // Render image if ImageId is present
                      <img
                        src={`https://your-api-url/images/${question.ImageId}`}
                        alt="Question Image"
                        style={{ maxWidth: "100%" }}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
            {/* Pagination */}
            <nav>
              <ul className="pagination">
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
