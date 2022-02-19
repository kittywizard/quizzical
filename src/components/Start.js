export default function Start(props) {
    return (

    <div className="container--start">
        <h1 className="headline">Quizzical</h1>
        <p className="start--desc">Description</p>
        <button
            onClick={props.toggle}
            className="btn"
        >
            Start Quiz
        </button>
    </div>

    )
}