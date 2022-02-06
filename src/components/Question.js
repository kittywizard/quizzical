import Answer from "./Answer";
import { nanoid, random } from "nanoid";

export default function Question(props) {

    //set two variables so we can set up answer array
    const answerArray = [];
    let answerObject ={};

    //go through the incorrect answers and add them to the array 
    props.answers.forEach(answer => {
        answerObject = {
            answerCopy: answer,
            isCorrectAnswer: false
        }

        answerArray.push(answerObject);
    });

    //generate a random num that should be between 0 (array start) and array.length (all multiple choice questions are 4. easy)
    function randomNum(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }
    //grab correct answer object
    answerObject = {
        answerCopy: props.correctAnswer,
        isCorrectAnswer: true
    }

    //splice correct answer into array randomly!
    answerArray.splice(randomNum(0, 3), 0, answerObject);

    function handleClick(event) {
        event.preventDefault();
       
    }
 
    const displayAnswerArray = answerArray.map(item => {
        return <Answer
                copy={item.answerCopy}
                isCorrectAnswer={item.isCorrectAnswer}
                key={nanoid()}
                toggle={(e) => handleClick(e)} 
                />
    });

    return (
        <div className="question">
            <p>1. {props.question}</p>
            <div className="answers">
                    {displayAnswerArray}
            </div>
        </div>
    )
}