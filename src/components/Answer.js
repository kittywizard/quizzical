export default function Answer(props) {

    const styles = {
        backgroundColor: props.isSelected ? "#ccc" : "cadetblue"
    }

    return (
        <div 
            className="answer"
            style={styles}
            onClick={(e) => props.toggle(e)}
        >
            {props.copy}
        </div>
    )
}