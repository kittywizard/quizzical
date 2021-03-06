import Answer from "./Answer";
import { nanoid } from "nanoid";

export default function Question(props) {

    const displayAnswerArray = props.answerArray.map((item, index) => {
        return <Answer
                copy={item.answerCopy}
                isCorrectAnswer={item.isCorrectAnswer}
                isSelected={item.isSelected}
                key={nanoid()}
                id={props.id}
                toggle={(e, id) => props.handleClick(e, id)}
                results={props.results} 
                />
    });

    return (
        <div className="question">
            <p>{props.id}. {props.question}</p>
            <div className="answers">
                    {displayAnswerArray}
            </div>
        </div>
    )
}