import APIClient from "../api/client";
import Placeholder from "../components/Placeholder";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { Question } from "../types";

type Props = {
  apiClient: APIClient;
};

export default function HomeContainer(props: Props) {

  const [gameStarted, setGameStarted] = useState(false);
  const [gameCategory, setGameCategory] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [gameDifficulty, setGameDifficulty] = useState("easy");
  const [gameType, setGameType] = useState("multiple");
  const [questions, setQuestions] = useState<Question[]>([]);

  return <Placeholder 
      gameStarted={gameStarted}
      gameCategory={gameCategory}
      numberOfQuestions={numberOfQuestions}
      gameDifficulty={gameDifficulty}
      gameType={gameType}
      setGameStarted={setGameStarted}
      setGameCategory={setGameCategory}
      setNumberOfQuestions={setNumberOfQuestions}
      setGameDifficulty={setGameDifficulty}
      setGameType={setGameType}
      questions={questions}
      setQuestions={setQuestions}
    />;
}
