import Question from "../Question";
import { nanoid } from "nanoid";
import {React, useState} from "react";

export default function QuizDisplay(props) {

    let tempAnswerArray = [];
    let completeAnswerArray = [];
    let answerObject = {};

    //setting the answer array objects up
    props.data.forEach((obj, index) => {
        //within each object, grab the incorrect answer array
        //set it up to an obj inside a tempAnswerArray
        tempAnswerArray = [];
        
        obj.incorrect_answers.forEach(answer => {
            answerObject = {
                answerCopy: answer,
                isCorrectAnswer: false,
                isSelected: false
            }
            tempAnswerArray.push(answerObject);
        });

        //correct answer 
        answerObject = {
            answerCopy: obj.correct_answer,
            isCorrectAnswer: true,
            isSelected: false
        }

        //splice correct answer into array randomly!
        tempAnswerArray.splice(Math.floor((Math.random() * (3 - 0 + 1)) + 0), 0, answerObject);

        //push each array into yet another array! this will become state
        completeAnswerArray.push(tempAnswerArray);
    });

    //set state with setup array
    const [answerArray, setAnswerArray] = useState(completeAnswerArray);

    //map through the array and deploy components
    const questionArr = props.data.map((item, index) => {
        return <div className="quiz-questionBlock">
            <Question 
                question={item.question}
                key={nanoid()}
                id={index + 1}
                answerArray={answerArray[index]}
                handleClick={(e) => handleClick(e)}
            />
            </div>
    });

    function checkAnswers() {
        console.log('check answers');

        //grab array of answers submitted - check to see which ones have correctAnswers

        //change styling on background to another color - to show which ones were correct

    }
    
    //function that handles when you click on an answer, will change state of selected variable
    function handleClick(event) {
        event.preventDefault();

        //grab copy from the event - what was clicked
        let copy = event.target.innerText;

        //for loop needs to loop through the entire answer array (which has arrays within it)
        for(let i = 0; i < answerArray.length; i++) {
            
            //this should return an updated array with a new isSelected fixed
                //map through each inner array - the four questions and find which one has been clicked and update it
            //filter first?
            const result = answerArray[i].filter(answer => answer.answerCopy === copy);
            console.log(result)
            return result;
            
            //outside of for loop - take updated array and push to state?
            
        }


        // setAnswerArray(prevState => {

        //     //loop through the questions
           
        // })
        
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