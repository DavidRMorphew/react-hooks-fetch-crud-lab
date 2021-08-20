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
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}/> : <QuestionList questions={questions} removeQuestion={removeQuestion}/>}
    </main>
  );
}

export default App;
