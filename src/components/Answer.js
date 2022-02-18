
export default function Answer(props) {

    //wow this is gross. fix later!
    function checkStyles() {
        if(props.results){
            if (props.isSelected && props.isCorrectAnswer) return "pink"
            else if (props.isSelected && !props.isCorrectAnswer) return "orange"
            else if (props.isCorrect && !props.isSelected) return "blue"
            else if(props.isSelected) return "green"
            else {
                return "#ccc"
            }
        } else {
            if(props.isSelected) return "green"
            else {
                return "#ccc"
        }
        
    }}

    return (
        <div 
            className="answer"
            style={
                {backgroundColor: checkStyles()}
            }
            onClick={(e) => props.toggle(e, props.id)}
        >
            {props.copy}
        </div>
    )
}