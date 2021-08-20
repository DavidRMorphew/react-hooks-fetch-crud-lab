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

  useEffect(()=>{
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      setQuestions(data)
    })
  }, [])

  return (
    <main>
      {console.log(questions)}
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion}/> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;
