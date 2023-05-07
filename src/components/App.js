import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error(error));
  }, []);

  async function handleQuestionAdd(newQuestion) {
    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const question = await response.json();
      setQuestions([...questions, question]);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  }

  async function handleQuestionDelete(id) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error(`Error deleting question with id ${id}:`, error);
    }
  }
  async function handleQuestionUpdate(id, correctIndex) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setQuestions(
        questions.map((question) =>
          question.id === id ? { ...question, correctIndex } : question
        )
      );
    } catch (error) {
      console.error(`Error updating question with id ${id}:`, error);
    }
  }
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onQuestionAdd={handleQuestionAdd} />
      ) : (
        <QuestionList
          questions={questions}
          onQuestionDelete={handleQuestionDelete}
          onQuestionUpdate={handleQuestionUpdate}
        />
      )}

    </main>
  );
}

export default App;
