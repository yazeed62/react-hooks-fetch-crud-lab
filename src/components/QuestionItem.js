import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(correctIndex);

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  //   function handleSelectChange(event) {
  //     const correctIndex = parseInt(event.target.value);
  //     setSelectedAnswerIndex(correctIndex);
  //     onUpdate(id, correctIndex);

  //   }
  //   async function handleDeleteClick() {
  //     try {
  //       const response = await fetch(`http://localhost:4000/questions/${id}`, {
  //         method: "DELETE",
  //       });
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       onDelete(id);
  //     } catch (error) {
  //       console.error(`Error deleting question with id ${id}:`, error);
  //     }
  //   }

  //   return (
  //     <li>
  //       <h3>{prompt}</h3>
  //       <ul>
  //         {answers.map((answer, index) => (
  //           <li key={index}>
  //             <label>
  //               <input
  //                 type="radio"
  //                 name={`question-${id}`}
  //                 value={index}
  //                 checked={correctIndex === index}
  //                 onChange={handleSelectChange}
  //               />
  //               {answer}
  //             </label>
  //           </li>
  //         ))}
  //       </ul>
  //       <button onClick={handleDeleteClick}>Delete</button>
  //     </li>
  //   );
  // }
  async function handleDelete() {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      onDelete(id);
    } catch (error) {
      console.error(`Error deleting question with id ${id}:`, error);
    }
  }

  return (
    <article>
      <h3>{prompt}</h3>
      <select
        value={selectedAnswerIndex}
        onChange={(event) => {
          setSelectedAnswerIndex(parseInt(event.target.value));
          onUpdate(id, parseInt(event.target.value));
        }}
      >
        {options}
      </select>
      <button onClick={handleDelete}>Delete</button>
    </article>
  );
}

export default QuestionItem;
