import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        onDeleteQuestion(id);
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdateQuestion(data);
      })
      .catch((error) => console.error(error));
  }



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={() => handleDeleteQuestion(question.id)}
            onUpdate={(correctIndex) =>
              handleUpdateQuestion(question.id, correctIndex)
            }
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
