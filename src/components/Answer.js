
export default function Answer(props) {

    //wow this is gross. fix later!
    function checkStyles() {
        if(props.results){
            if (props.isSelected && props.isCorrectAnswer) return "rgb(87, 221, 116)"
            else if (props.isSelected && !props.isCorrectAnswer) return "rgb(252, 121, 98)"
            else if (props.isCorrect && !props.isSelected) return "rgb(100, 221, 100)"
            else if(props.isSelected) return "rgba(19,27,105, 0.5)"
            else {
                return "rgba(19,27,105, 0.2)"
            }
        } else {
            if(props.isSelected) return "rgba(19,27,105, 0.5)"
            else {
                return "rgba(19, 27, 105, 0.2)"
        }
        
    }}

    return (
        <div 
            className="answer"
            style={
                {backgroundColor: checkStyles(),
                fontWeight: props.isSelected ? '700' : '400'}
            }
            onClick={(e) => props.toggle(e, props.id)}
        >
            {props.copy}
        </div>
    )
}