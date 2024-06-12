import { Question } from "../types";
import Button from "../componentLibrary/Button";
import Card from "../componentLibrary/Card";
import AnswerCard from "../componentLibrary/AnswerCard";
import { useState, useEffect } from "react";
import Spinner from '../componentLibrary/Spinner.tsx';
import '../componentLibrary/General.css';

const shuffleArray = (array: string[]): string[] => {
  const shuffledArray: string[] = [...array];
  for (let i: number = shuffledArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const decodeHtmlEntities = (html: string): string => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

type QuestionComponentProps = {
  allQuestions: Question[]; // Assuming allQuestions is an array of Question objects
  currentQuestion: Question;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

type Score = {
  rightAnswers: number;
  wrongAnswers: number;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ allQuestions, currentQuestion, currentQuestionIndex, setCurrentQuestionIndex, setGameStarted, setNumberOfQuestions, setQuestions }) => {

  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [questionOptions, setQuestionOptions] = useState<string []>();
  const [quizDone, setQuizDone] = useState<boolean>(false);
  const [score, setScore] = useState<Score>({ rightAnswers: 0, wrongAnswers: 0 });

  const incrementRightAnswers = () => {
    setScore((prevScore) => ({ ...prevScore, rightAnswers: prevScore.rightAnswers + 1 }));
  };
  
  const incrementWrongAnswers = () => {
    setScore((prevScore) => ({ ...prevScore, wrongAnswers: prevScore.wrongAnswers + 1 }));
  };

  const nextQuestion = () => {
    if (selectedAnswer && selectedAnswer !== "") {
      if (currentQuestionIndex < allQuestions.length) {      
          selectedAnswer === currentQuestion.correct_answer ? incrementRightAnswers() : incrementWrongAnswers()
          setCurrentQuestionIndex((prevState) => prevState+1)
          setSelectedAnswer("")
      } else {
          console.log("do nothing")
      }          

    }
  }

  const seeScore = () => {
    // increment the last question
    if (selectedAnswer && selectedAnswer !== "") {
      selectedAnswer === currentQuestion.correct_answer ? incrementRightAnswers() : incrementWrongAnswers()
      setQuizDone(true)
    }
  }

  const newGame = () => {
      setQuizDone(false)
      setSelectedAnswer("")
      setQuestionOptions([])
      setScore({rightAnswers: 0, wrongAnswers: 0 })
      // go back to home page with quiz settings
      setGameStarted(false)
      setQuestions([])
      setNumberOfQuestions(1)
  }

  const selectAnswer = (event: React.MouseEvent<HTMLDivElement>) => {
    setSelectedAnswer((event.currentTarget as HTMLDivElement).innerHTML);
  };


  let options: string[] = [];

  useEffect(() => {
    if (currentQuestion) {
      options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
      setQuestionOptions(shuffleArray(options));
    }
  }, [currentQuestion])

  if (quizDone) {
      return (
        <div>
            <h1>Quiz Results:</h1>
            <h1 style={{color: 'green'}}>{score.rightAnswers} correct answers</h1>
            <h1 style={{color: 'red'}}>{score.wrongAnswers} wrong answers</h1>
            <Button onClick={newGame}>New Game</Button>
        </div>
      )
  } else {
    if (!allQuestions.length) {
        return <Spinner />
    } else {
        return (
            <div>
                <h1>Question {currentQuestionIndex+1} out of {allQuestions.length}</h1>

                  <Card>{currentQuestion ? decodeHtmlEntities(currentQuestion.question) : ""}</Card>

                  {questionOptions && questionOptions.map((option, index) => (
                      <AnswerCard selectedOrNot={option === selectedAnswer} key={index} onClick={selectAnswer} >{decodeHtmlEntities(option)}</AnswerCard>
                  ))}

                  {currentQuestionIndex < allQuestions.length-1 ?
                  
                      <Button onClick={nextQuestion}>
                          Next Question
                      </Button>
                  
                    :
                    
                      <Button onClick={seeScore}>
                          See Score
                      </Button>
                  }
                  
            </div>
        );
    }
      
  }

  
};

export default QuestionComponent;
