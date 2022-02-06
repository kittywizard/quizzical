import Question from "./Question";
import { nanoid } from "nanoid";
import {React, useState} from "react";

export default function QuizDisplay(props) {

    let tempAnswerArray = [];
    let answerObject = {};

    props.data.forEach((obj, index) => {
        //within each object, grab the incorrect answer array
        //set it up to an obj inside a tempAnswerArray
        obj.incorrect_answers.forEach(answer => {
            answerObject = {
                answerCopy: answer,
                isCorrectAnswer: false,
                isSelected: false
            }
            tempAnswerArray.push(answerObject);
        });

        answerObject = {
            answerCopy: obj.correct_answer,
            isCorrectAnswer: true,
            isSelected: false
        }

        //splice correct answer into array randomly!
        tempAnswerArray.splice(Math.floor((Math.random() * (3 - 0 + 1)) + 0), 0, answerObject);
    });

    //set state with setup array
    const [answerArray, setAnswerArray] = useState(tempAnswerArray);
    console.log(answerArray);

    /* 
        PROBLEMS!
                this is currently putting ALL answers into one big array.
                need ONE array that contains FIVE smaller arrays. ugh

    */
  
    //map through the array and deploy components
    const questionArr = props.data.map((item, index) => {
        return <div className="quiz-questionBlock">
            <Question 
                question={item.question}
                key={nanoid()}
                id={index + 1}
                answerArray={answerArray}
                handleClick={(e) => handleClick(e)}
            />
            </div>
    });

    //unsure if this will stay here
    function checkAnswers() {
        console.log('check answers');

        //grab array of answers submitted - check to see which ones have correctAnswers

        //change styling on background to another color - to show which ones were correct

    }

    
    //function that handles when you click on an answer
    function handleClick(event) {
        event.preventDefault();
        const {name} = event.target;
        console.log(name);

        //change styling of answer - background color change
        //add to an array so we know which ones user picked
            //also need the correct answer, if user didn't pick it?
        
       
    }
    
    return (
        <main>
            <section className="quiz-display">
                {questionArr}        
            </section>

            <section>
                <button 
                    onClick={checkAnswers}
                    className="btn"
                >
                    Check answers
                </button>
            </section>

            <section>
                Results here
            </section>

        </main>
    )
}