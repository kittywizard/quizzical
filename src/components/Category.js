export default function Category(props) {


    const styles = {
        backgroundColor: props.isSelected ? "#ccc" : "pink"
    }

    return (
        <button className="category"
            onClick={() => props.toggleCategories(props.id)}
            style={styles}
        >
            {props.name}
        </button>
    )
}