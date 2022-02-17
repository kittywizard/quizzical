import Question from "../Question";
import { nanoid } from "nanoid";
import {React, useEffect, useState} from "react";

export default function QuizDisplay(props) {

    let tempAnswerArray = [];
    let completeAnswerArray = [];
    let answerObject = {};

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

    const [answerArray, setAnswerArray] = useState(completeAnswerArray);
    const [answerCheck, setAnswerCheck] = useState(false);
    const [results, setResults] = useState([]);

    /*
        use effect works - need to work out a bug if user changes answer after all 5 are selected
    */

    useEffect(() => {
        let check = 0;

        //need to check and ensure it's not the initial render
        if(answerArray.length === 5){

            answerArray.forEach(answer => {
                for(let a = 0; a < 3; a++) {
                    if(answer[a].isSelected) {
                        check++;
                    }
                }
            })

        }
        if(check === 5){
            setAnswerCheck(prevState => !prevState);
        }
     
    },[answerArray]);

    const questionArr = props.data.map((item, index) => {
        return <div className="quiz-questionBlock">
            <Question 
                question={item.question}
                key={nanoid()}
                id={index + 1}
                answerArray={answerArray[index]}
                handleClick={(e, id) => handleClick(e, id)}
                results={results}
            />
            </div>
    });

    function checkAnswers() {
        //set state that when this get clicked its set to true. have a useeffect looking for that change and take care of it
        
        // const checkForCorrect = answerArray.flatMap(answer => {
        //     for(let i=0; i < answerArray.length; i++) {
        //         if(answer[i].isCorrectAnswer){
        //             return answer[i];
        //         }
        //     }
        // });

        //const correctAnswers = checkForCorrect.filter(answer => answer.isSelected);

        //const checkForCorrect = collectedAnswers.filter(answer => answer.isCorrectAnswer);
        
        //check array for correct answers
            //check to see if correct answer is also Selected
            //add diff class
            //add to results tally if correct
        //display/update result state

    }
    
    //function that handles when you click on an answer, will change state of selected variable
    function handleClick(event, questionID) {
        event.preventDefault();
        let copy = event.target.innerText;

        //need to find the index of the array that matches (+1) the questionID THEN can filter/compare whatever
            //.flat() gets rid of the nesting effect
        const filteredArray = answerArray.filter((answer, index) => questionID === index + 1).flat();

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

    //change state - need in 2 places
    function changeAnswer(arr,copy,id) {
        arr.forEach(answer => {
            if(copy === answer.answerCopy) {
                answer.isSelected = !answer.isSelected;
            }
        });
        
        //update state!!!!
        setAnswerArray(prevState => prevState.map(answer => id === answer.id ? arr : answer))
    }
    
    return (
        <main>
            <section className="quiz-display">
                {questionArr}        
            </section>

            <section>
                {answerCheck && <button 
                    onClick={checkAnswers}
                    className="btn"
                > 
                    Check answers
                </button>}
            </section>

            {//need a var here to determine when to display results
                <section>
                Results here
            </section>}

        </main>
    )
}