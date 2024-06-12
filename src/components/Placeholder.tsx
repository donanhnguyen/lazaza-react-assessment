import { useTheme } from "@emotion/react";
import Flex from "../componentLibrary/Flex";
import Button from "../componentLibrary/Button";
import { Question } from "../types";
import Axios from "axios";
import QuestionComponent from './QuestionComponent.js';
import { useState } from "react";
import '../componentLibrary/General.css';

type Props = {
  gameStarted: Boolean;
  gameCategory: String;
  numberOfQuestions: number;
  gameDifficulty: string;
  gameType: String;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setGameCategory: React.Dispatch<React.SetStateAction<string>>;
  setNumberOfQuestions: React.Dispatch<React.SetStateAction<number>>;
  setGameDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setGameType: React.Dispatch<React.SetStateAction<string>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
};

export default function Placeholder(props: Props) {
  const theme = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

  const startTheGame = () => {
    // dont start it until all selections are made
    if (props.numberOfQuestions !== 0) {
      props.setGameStarted(true)
      fetchQuestions()
    } else {
      alert("Please make all selections.")
    }
  }

  const fetchQuestions = () => {
    const CATEGORY = "12";
    Axios.get(`https://opentdb.com/api.php?amount=${props.numberOfQuestions}&category=${CATEGORY}&difficulty=${props.gameDifficulty}&type=${props.gameType}`)
      .then((response) => {
        console.log(response.data.results)
        props.setQuestions(response.data.results)
        setCurrentQuestionIndex(0)
      })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string to enable clearing the input
    if (value === '' || (!isNaN(Number(value)) && Number(value) >= 1 && Number(value) <= 50)) {
      props.setNumberOfQuestions(Number(value));
    }
  };

  const handleSetGameDifficulty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.setGameDifficulty(event.target.value);
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >

      {/* add select and option elements for each of the game options */}
      {!props.gameStarted ?
          // set amount of questions
          <div className="form-container">
              <h1 className="header">
                Instructions: Select your number of questions and difficulty mode, then click "Start Game" to begin playing.
              </h1>

              <label className="styled-label" htmlFor="numberOfQuestions">Number of Questions:</label>
              <input
                className="styled-input"
                id="numberOfQuestions"
                type="number"
                value={props.numberOfQuestions}
                onChange={handleInputChange}
                min="1"
                max="50"
              />
              {/* game difficulty */}
              <label className="styled-label" htmlFor="gameDifficulty">Game Difficulty:</label>
              <select
                className="styled-select"
                id="gameDifficulty"
                value={props.gameDifficulty}
                onChange={handleSetGameDifficulty}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {/* set quiz type (multiple or true/false) */}
              
              {/* set quiz category (entertainment, sports, etc.) */}

          </div>
      :
          // only show questions if game is started and button has been pressed
              <Flex
                justifyContent="space-around"
                marginBottom={theme.space_huge}
                width="90%"
              >
                  <QuestionComponent 
                    allQuestions={props.questions}
                    currentQuestion={props.questions[currentQuestionIndex]}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    setGameStarted={props.setGameStarted}
                    setNumberOfQuestions={props.setNumberOfQuestions}
                    setQuestions={props.setQuestions}
                  />
                  
              </Flex>
      }
     
      {/* button to start the game. button goes away once its clicked */}
      {!props.gameStarted ? <Button onClick={startTheGame}>Start Game</Button> : ""}
      
    </Flex>
  );
}
