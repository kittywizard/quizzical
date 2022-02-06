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

    //unsure if this will stay here
    function checkAnswers() {
        console.log('check answers')
    }
    
    return (
        <main>
            <section className="quiz-display">
                {questionArr}        
            </section>

            <section>
                <button 
                    onClick={checkAnswers}
                >
                    Check answers
                </button>
            </section>

        </main>
    )
}