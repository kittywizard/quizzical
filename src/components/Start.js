export default function Start(props) {
    return (

    <div className="App">
        <h1>Quizzical</h1>
        <p>Description</p>
        <button
            onClick={props.toggle}
            className="btn"
        >
            Start Quiz
        </button>
    </div>

    )
}