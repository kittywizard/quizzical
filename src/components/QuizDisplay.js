import Question from "./Question";
import { nanoid } from "nanoid";

export default function QuizDisplay(props) {

    //map through the array and deploy components
    const questionArr = props.data.map(item => {
        return <div className="quiz-questionBlock">
            <Question 
                question={item.question}
                key={nanoid()}
                answers={item.incorrect_answers}
                correctAnswer={item.correct_answer}
            />
            </div>
    });
    
    return (
        <div className="quiz-display">
            {questionArr}        
        </div>
    )
}