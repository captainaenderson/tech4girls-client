import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerWasCorrect, setAnswerWasCorrect] = useState(null);
  const {category} = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/questions/${category}`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => console.error(`Es gab einen Fehler bei der Abfrage der Fragen: ${error}`));
  }, [category]);

  const handleAnswerChange = (i) => {
    setSelectedAnswer(i);
    const correct = questions[currentStep].Answers[i].CorrectAnswer;
    setAnswerWasCorrect(correct);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);  // Reset selected answer for next question
    setCurrentStep(currentStep + 1);  // Move to next question
    setAnswerWasCorrect(null);  // Reset the answer result
  };

  if (!questions.length) {
    return <div>Loading...</div>
  }

  return (
    <div>
        <h2>{questions[currentStep].Question}</h2>
        {questions[currentStep].Answers.map((answer, i) => (
          <div key={i}>
            <input type="radio" id={`answer-${i}`} name="answer" checked={selectedAnswer === i} onChange={() => handleAnswerChange(i)} />
            <label htmlFor={`answer-${i}`}>{answer.AnswerText}</label>
          </div>
        ))}
        <button onClick={nextQuestion}>Weiter</button>
        {answerWasCorrect !== null && (answerWasCorrect ? <p>Correct!</p> : <p>Falsch!</p>)}
    </div>
  );
}

export default QuizPage;
