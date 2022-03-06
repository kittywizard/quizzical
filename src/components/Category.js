export default function Category(props) {


    const styles = {
        backgroundColor: props.isSelected ? "rgba(19,27,105, 0.3)" : "rgba(19,27,105, 0.8)",
        color: props.isSelected ? "#444" : "#fff"
    }

    return (
        <button className="category btn"
            onClick={() => props.toggleCategories(props.id)}
            style={styles}
        >
            {props.name}
        </button>
    )
}