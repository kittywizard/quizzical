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
