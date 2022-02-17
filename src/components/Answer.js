import { useEffect } from "react"

export default function Answer(props) {

    const styles = {
        backgroundColor: props.isSelected ? "#ccc" : "cadetblue"
    }

    const winStateStyles = {
        backgroundColor: props.isCorrectAnswer ? "pink" : "green"
    }

    useEffect(() => {

    },[])
    

    return (
        <div 
            className="answer"
            //style={props.results ? {styles} : {winStateStyles}}
            style={styles}
            onClick={(e) => props.toggle(e, props.id)}
        >
            {props.copy}
        </div>
    )
}