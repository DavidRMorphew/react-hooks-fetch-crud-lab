import React from "react";
import QuestionItem from './QuestionItem'

function QuestionList({ questions }) {

    return (
    <section>
      {console.log(questions)}
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => <QuestionItem key={question.id} question={question} />)}
      </ul>
    </section>
  );
}

export default QuestionList;
