export default function Start(props) {
    return (

    <div className="container--start">
        <h1 className="headline">Quizzical</h1>
        <p className="start--desc">Trivia to test your knowledge of the random! Five multiple choice questions and no time limit.</p>
        <button
            onClick={props.toggle}
            className="btn"
        >
            Start Quiz
        </button>
    </div>

    )
}