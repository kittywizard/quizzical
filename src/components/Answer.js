export default function Answer(props) {

    return (
        <div 
            className="answer"
            onClick={props.toggle}
        >
            {props.copy}
        </div>
    )
}