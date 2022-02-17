/*
    set up css classes - on select, change class
    etc

*/

export default function Answer(props) {

    const defaultStyles = {
        backgroundColor: props.isSelected ? "green" : "#ccc"
    }

    const correctSelectedAnswers = {
        backgroundColor: props.isSelected && props.isCorrectAnswer ? "pink" : "#ccc"
    }

    const incorrectSelectedAnswers = {
        backgroundColor: props.isSelected && !props.isCorrectAnswer ? "orange" : "#ccc"
    }

    const correctUnselectedAnswers = {
        backgroundColor: props.isCorrect && !props.isSelected ? "blue" : "#ccc"
    }


    function checkStyles() {
        if(props.isSelected) return "green"
        else if (props.isSelected && props.isCorrectAnswer) return "pink"
        else if (props.isSelected && !props.isCorrectAnswer) return "orange"
        else if (props.isCorrect && !props.isSelected) return "blue"
        else {
            return "#ccc"
        }
    }

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