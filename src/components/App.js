import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
const url = 'http://localhost:4000/questions'

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  const addQuestion = (newQuestion) => {
    setQuestions((questions) => [...questions, newQuestion])
  }

  const removeQuestion = (id) => {
    const configBody = {
      method: 'DELETE',
    }
    fetch(url + '/' + id, configBody)
    const deleteQuestion = questions.find(question => question.id === id)
    const deleteIndex = questions.indexOf(deleteQuestion)
    setQuestions((questions) => [...questions.slice(0, deleteIndex), ...questions.slice(deleteIndex + 1)])
  }

  const updateAnswer = (questionId, correctedIndex) => {
    const configBody = { 
      method: 'PATCH',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: correctedIndex })
    }
    fetch(url + '/' + questionId, configBody)
    .then(resp => resp.json())
    .then(updatedQuestion => {
      console.log(updatedQuestion)
      const question = questions.find(question => question.id === questionId)
      const updatedQuestionIndex = questions.indexOf(question)
      setQuestions((questions) => [...questions.slice(0, updatedQuestionIndex), updatedQuestion, ...questions.slice(updatedQuestionIndex + 1)])
    })
  }

  useEffect(()=>{
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      setQuestions(data)
    })
  }, [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}/> : <QuestionList questions={questions} removeQuestion={removeQuestion} updateAnswer={updateAnswer}/>}
    </main>
  );
}

export default App;
