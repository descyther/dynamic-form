import "./App.css";
import React, { useEffect, useState } from "react";
import TextInput from "./components/TextInput";
import quesitonData from "./questions.json";
import DatePicker from "./components/DatePicker";
const App = () => {
  const [questions] = useState([...quesitonData]);
  const [questionIndex, setQuestionIndex] = useState(0);
  //simple fix for the error was to add an OR logical operator
  const { text, type } = questions[questionIndex] || { type: "", text: "" };
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [previousIndex, setPreviousIndex] = useState([]);
  const [countBack, setCountBack] = useState(1);
  const [input, setInput] = useState("");

  const getQuestionByID = () => {
    return questions.findIndex(
      (question, index) =>
        questions[questionIndex].NextQuestion === questions[index].id
    );
  };
  const handleNext = () => {
    if (questionIndex <= questions.length) {
      setPreviousIndex((prev) => [...prev, questionIndex]);
      setCountBack(answers.length);
      setQuestionIndex(getQuestionByID());

      if (answers[questionIndex]) {
        setInput(answers[questionIndex].answer);
      } else setInput("");
    }
  };
  const handleBack = () => {
    if (questionIndex === questions[0].id) {
      setPreviousIndex([]);
    }
    //also need to pop previous question index when going back
    setCountBack(countBack - 1);
    setQuestionIndex(previousIndex[countBack]);
  };
  const handleAnswers = () => {
    if (
      answers.filter((answer) => answer.id === questions[questionIndex].id)
        .length > 0
    ) {
      let answerArr = [...answers];
      let singleAnswer = { ...answerArr[questionIndex - 1] };
      singleAnswer.answer = input;
      answerArr[questionIndex] = singleAnswer;
      setAnswers(answerArr);
    } else {
      setAnswers((prev) => [
        ...prev,
        {
          id: questions[questionIndex].id,
          question: questions[questionIndex].text,
          answer: input,
        },
      ]);
    }
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

  if (questionIndex == -1) {
    return (
      <div className="Container">
        <h1>Thank you for completing this form!</h1>
        <p>Your answers where:</p>
        {answers.map((answer, index) => {
          return (
            <div key={index}>
              <h3>
                Q{index + 1}: {answer.question}
              </h3>
              <p>A: {answer.answer}</p>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="Container">
      <div id="Questionnaire">
        <h3>Question {questionIndex + 1}:</h3>
        <form>
          <label htmlFor={type}>{text}:</label>
          <div>
            {handleQuestionType()}
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
          </div>
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
