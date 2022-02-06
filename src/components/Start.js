export default function Start(props) {
    return (

    <div className="App">
        <h1>Quizzical</h1>
        <p>Description</p>
        <button
            onClick={props.toggle}>
            Start Quiz
        </button>
    </div>

    )
}