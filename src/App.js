import "./App.css";
import React, { useEffect, useState } from "react";
import TextInput from "./components/TextInput";
import quesitonData from "./questions.json";
import DatePicker from "./components/DatePicker";
const App = () => {
  const [input, setInput] = useState("");
  const [questions, setQuestions] = useState([...quesitonData]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { text, type } = questions[questionIndex];
  const [answers, setAnswers] = useState([{ question: "", answer: "" }]);
  const [error, setError] = useState("");
  const handleNext = () => {
    if (questionIndex <= questions.length) {
      setQuestionIndex((prev) => prev + 1);
      setInput("");
    }
  };
  const handleAnswers = () => {
    setAnswers((prev) => [
      ...prev,
      { question: questions[questionIndex].text, answer: input },
    ]);
    console.log(answers);
  };
  const handleBack = () => {
    setQuestionIndex((prev) => prev - 1);
  };
  const handleQuestionType = () => {
    switch (type) {
      case "date":
        return (
          <DatePicker
            input={input}
            setInput={(value) => setInput(value)}
            data={questions[questionIndex]}
          />
        );
      case "integer":
        return (
          <TextInput
            input={input}
            setInput={(value) => setInput(value)}
            data={questions[questionIndex]}
          />
        );
      case "text input":
        return (
          <TextInput
            input={input}
            setInput={(value) => setInput(value)}
            data={questions[questionIndex]}
          />
        );
      case "text area":
        return (
          <TextInput
            input={input}
            setInput={(value) => setInput(value)}
            data={questions[questionIndex]}
          />
        );
      default:
        return null;
    }
  };

  if (questionIndex + 1 > questions.length) {
    return (
      <>
        <h1>Thank you for completing this form!</h1>
        <p>Your answers where:</p>
        {answers.map((answer) => {
          return (
            <ul>
              <p>{answer.question}</p>
              <li>{answer.answer}</li>
            </ul>
          );
        })}
      </>
    );
  }
  return (
    <div className="Container">
      <div id="Questionnaire">
        <h3>Question {questionIndex + 1}:</h3>
        <form>
          <label htmlFor={""}>
            {text}:{handleQuestionType()}
            <input
              type="button"
              value="Submit"
              onClick={() => {
                input.length > 0
                  ? handleNext()
                  : setError("Please Enter a value");
                handleAnswers();
              }}
            />
          </label>
        </form>
        {questionIndex > 0 && (
          <input type="button" value="Back" onClick={handleBack} />
        )}
        {error.length > 0 && <p>{error}</p>}
      </div>
    </div>
  );
};

export default App;
