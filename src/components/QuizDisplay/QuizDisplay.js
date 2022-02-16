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

    //set state with setup array
    const [answerArray, setAnswerArray] = useState(completeAnswerArray);
    const [answerCheck, setAnswerCheck] = useState(false);

    //error because this is running before the state is 'finalized'
    useEffect(() => {
        let check = 0;
        //every time the answerArray state changes, check to see if 5 answers have been selected
        answerArray.forEach(answer => {
            for(let a=0; a < answerArray.length; a++) {
                if(answer[a].isSelected) {
                    console.log(answer[a].answerCopy);
                    check++;
                }
            }
        })
            
            
            if(check === 5){
                setAnswerCheck(true)
            }
     
    },[answerArray]);

    //map through the array and deploy components
    const questionArr = props.data.map((item, index) => {
        return <div className="quiz-questionBlock">
            <Question 
                question={item.question}
                key={nanoid()}
                id={index + 1}
                answerArray={answerArray[index]}
                handleClick={(e, id) => handleClick(e, id)}
            />
            </div>
    });

    function checkAnswers() {

        const collectedAnswers = answerArray.flatMap(answer => {
            for(let i=0; i < answerArray.length; i++) {
                if(answer[i].isSelected){
                    return answer[i];
                }
            }
        });
        

        
        //change styling on background to another color - to show which ones were correct

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
            console.log(selectedAnswer);

            //if it's NOT the one that was just clicked (i.e the user wishes to unselect their answer)
            if(selectedAnswer.answerCopy !== copy) {

                console.log('selected answer does not matches copy')
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

            <section>
                Results here
            </section>

        </main>
    )
}