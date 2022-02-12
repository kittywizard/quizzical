import Question from "../Question";
import { nanoid } from "nanoid";
import {React, useState} from "react";

export default function QuizDisplay(props) {

    let tempAnswerArray = [];
    let completeAnswerArray = [];
    let answerObject = {};

    //setting the answer array objects up

    /*
        NEED TO DO:
        -add an id to each answer object tying it to the question?
        -filter based on question and then can cycle through to see which was selected


    */
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
                handleClick={(e, id) => handleClick(e, id)}
            />
            </div>
    });

    function checkAnswers() {
        console.log('check answers');

        //grab array of answers submitted - check to see which ones have correctAnswers

        //change styling on background to another color - to show which ones were correct

    }
    
    //function that handles when you click on an answer, will change state of selected variable
    function handleClick(event, questionID) {
        event.preventDefault();

        //grab copy from the event - what was clicked
        let copy = event.target.innerText;
        //need to find the index of the array that matches (+1) the questionID THEN can filter/compare whatever
        const filteredArray = answerArray.filter(answer => questionID === answer.findIndex(answer => ));

        //garbage
        for(let i = 0; i < answerArray.length; i++) {
            console.log(answerArray[i])
            //need to find its 
            if(answerArray[i].id === questionID) {
                console.log(answerArray[i])
            }
        }
        

        //filter array to only array we need

        //combine these two - filter the array down so we can go in and update its state

        // setAnswerArray(prevState => {
        //     const filteredArray = prevState.filter(answer => questionID === answer.id);

        //     filteredArray.forEach(answer => {
        //         if(copy === answer.answerCopy) {
        //             //update isSelected
        //             answer.isSelected = !answer.isSelected;
        //         }
        //     });

        //     prevState.map(answer => {
        //         //want to return the new state which is the same, except for finding and replacing w/ filteredarray
        //         return questionID === answer.id ? {...answer, filteredArray} : answer;
        //     })
           
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