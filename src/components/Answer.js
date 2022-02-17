/*
    set up css classes - on select, change class
    etc

*/

export default function Answer(props) {

    return (
        <div 
            className="answer"
            onClick={(e) => props.toggle(e, props.id)}
        >
            {props.copy}
        </div>
    )
}