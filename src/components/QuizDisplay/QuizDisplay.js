import Question from "../Question";
import { nanoid } from "nanoid";
import {React, useEffect, useState} from "react";
import he from 'he';

export default function QuizDisplay(props) {

    //temp variables for map() and setting state
    let tempAnswerArray = [];
    let completeAnswerArray = [];
    let answerObject = {};

    props.data.forEach((obj, index) => {
        //within each object, grab the incorrect answer array
        //set it up to an obj inside a tempAnswerArray
        tempAnswerArray = [];
        
        obj.incorrect_answers.forEach(answer => {
            answerObject = {
                answerCopy: he.decode(answer),
                isCorrectAnswer: false,
                isSelected: false
            }
            tempAnswerArray.push(answerObject);
        });

        //correct answer 
        answerObject = {
            answerCopy: he.decode(obj.correct_answer),
            isCorrectAnswer: true,
            isSelected: false
        }

        //splice correct answer into array randomly!
        tempAnswerArray.splice(Math.floor((Math.random() * (3 - 0 + 1)) + 0), 0, answerObject);

        //push each array into yet another array! this will become state
        completeAnswerArray.push(tempAnswerArray);
    });

    //state
    const [answerArray, setAnswerArray] = useState(completeAnswerArray);
    const [answerCheck, setAnswerCheck] = useState(false);
    const [results, setResults] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState([])

    /*
        use effect works - need to work out a bug if user changes answer after all 5 are selected
        sometimes it seems like it doens't update properly?? 
            attempting to test and find out why. nothing so far.
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

    //useEffect that checks when results changes- filters the answers for correct ones    
    useEffect(() => {
        if(results) {
             const checkForCorrect = answerArray.filter(answer => {
                for(let i=0; i < 4; i++) {
                    if(answer[i].isCorrectAnswer && answer[i].isSelected){
                        return answer[i];
                    }
                }
            });
            setCorrectAnswers(checkForCorrect);
        }
    },[results]);

    const questionArr = props.data.map((item, index) => {
        return <Question 
                question={he.decode(item.question)}
                key={nanoid()}
                id={index + 1}
                answerArray={answerArray[index]}
                handleClick={(e, id) => handleClick(e, id)}
                results={results}
            />
    });

    function checkAnswers() {setResults(true)}
    
    //function that handles when you click on an answer, will change state of selected variable
    function handleClick(event, questionID) {
        event.preventDefault();

        //if user is checking results, no changing answers allowed!
        if(results){
            return;
        }

        //otherwise, commence with the changing
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

    //reloads the page for now. add more features later
    function newGame() {
        window.location.reload(false);
    }
    
    return (
        <main className="main--container">
            <section className="quiz-display">
                {questionArr}        
            </section>

            {!results && <section className="check-answers">
                {answerCheck && <button 
                    onClick={checkAnswers}
                    className="btn"
                    > 
                    Check answers
                </button>}
            </section>}

            {results &&
                <section className="results">
                You got <span className="result-count">{correctAnswers.length}</span> / 5 answers correct!

                <button className="btn"
                        onClick={newGame}
                    >
                        New Game
                    </button>
            </section>}

        </main>
    )
}