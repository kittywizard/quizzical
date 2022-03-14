import {React, useState, useEffect} from "react";
import Start from "./components/Start";
import Categories from "./components/Categories";
import { nanoid } from "nanoid";

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [category, setCategories] = useState([]);

  //update this to account for category choice
  useEffect(() =>  {
      try {
        fetch(`https://opentdb.com/api_category.php`)
        .then(resp => resp.json())
        .then(data => {
              setCategories(data.trivia_categories);
        });
      }
      catch(error){
        console.log(error);
      }
  
    }, []);


  function toggleStart() {
    setStartQuiz(true);
  }

  function handleClick(event, questionID, arr) {
    event.preventDefault();

    //need this check in QuizDisplay only
    if(results){
        return;
    }

    //otherwise, commence with the changing
    let copy = event.target.innerText;

    //need to filter array (category or question/answer) - but answer array has more layers
    const filteredArray = arr.filter((answer, index) => questionID === index + 1).flat();

    //if some of them are answered then...
    if(filteredArray.some(answer => answer.isSelected)) {
        //find the specific object
        let selectedAnswer = filteredArray.find(answer => answer.isSelected);

        //if it's NOT the one that was just clicked (i.e the user wishes to unselect their answer)
        if(selectedAnswer.answerCopy !== copy) {

            console.log('selected answer does not match copy')
        } else {
            changeAnswer(filteredArray, copy, questionID);
        }
    } else {
        changeAnswer(filteredArray, copy, questionID);
    }
}

  return (
    <div className="container">
      {!startQuiz && 
            <Start 
              toggle={toggleStart}
            />
      }
      {
        startQuiz &&
          <Categories 
              setQuestions={setQuestions}
              questions={questions}
              category={category}
          />
      }

    </div>

    
  );
}

export default App;
