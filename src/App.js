import {React, useState, useEffect} from "react";
import Start from "./components/Start";
import QuizDisplay from "./components/QuizDisplay";
import { nanoid } from "nanoid";


function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);

  function toggleStart() {
    setStartQuiz(true);
  }

  useEffect(() =>  {
    try {
      fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then(resp => resp.json())
      .then(data => {
        
        let dataResult = data.results;

        //update state with question array
        setQuestions(dataResult);
      });
    }
    catch(error){
      console.log(error);
    }
   

  }, []);

  return (
    <div className="container">
      {!startQuiz && 
            <Start 
              toggle={toggleStart}
            />
      }

      {startQuiz &&
        <QuizDisplay 
            data={questions}
            key={nanoid()}
        />
      }

    </div>

    
  );
}

export default App;
