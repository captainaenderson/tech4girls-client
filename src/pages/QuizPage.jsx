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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white pt-16">
    <div className="w-1/2 bg-white bg-opacity-30 rounded shadow-md p-4">
      <h2 className="text-4xl font-bold mb-4">{questions[currentStep].Question}</h2>
      {questions[currentStep].Answers.map((answer, i) => (
        <div key={i} className="mb-4">
          <input 
            type="radio" 
            id={`answer-${i}`} 
            name="answer" 
            className="mr-2" 
            checked={selectedAnswer === i} 
            onChange={() => handleAnswerChange(i)} 
          />
          <label htmlFor={`answer-${i}`} className="text-lg">{answer.AnswerText}</label>
        </div>
      ))}
      <button 
        className="px-4 py-2 mb-4 rounded text-white bg-blue-500" 
        onClick={nextQuestion}
      >
        Weiter
      </button>
      {answerWasCorrect !== null && (answerWasCorrect ? <p className="text-green-500">Correct!</p> : <p className="text-red-500">Falsch!</p>)}
    </div>
  </div>
  
  );
}

export default QuizPage;
