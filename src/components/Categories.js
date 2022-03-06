import { useEffect, useState } from "react";
import QuizDisplay from "./QuizDisplay/QuizDisplay";
import Category from "./Category";

import { nanoid } from "nanoid";

export default function Categories(props) {
    const [startGame, setStartGame] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const tempArray = props.category.map(category => {
            return {
                ...category,
                isSelected: false
            }
        });
        setCategories(tempArray);
    }, []);


    function toggleStart() {
        setStartGame(true)
    }

    function toggleCategories(id) {

        setCategories(prevState => prevState.map(category => {
            return category.id === id ?
                {...category, isSelected: !category.isSelected} :
                category
        }))
        
    }

    //map and render all the categories
     const arrayCategories = categories.map(category => {
        return <Category 
                    id={category.id} 
                    name={category.name}
                    key={nanoid()}
                    isSelected={category.isSelected}
                    toggleCategories={toggleCategories}
                />
    });

    return (
        <div className="container">
            {!startGame &&
                <section className="container-category">

                <h2 className="headline">Choose a category to get started!</h2>

                <Category
                    id={0}
                    name="All"
                    key={nanoid()}
                />
                {arrayCategories}

                <button 
                    className="btn"
                    onClick={toggleStart}>
                Start Game!
                </button>
                </section>
            }
        
            {startGame &&
                <QuizDisplay 
                    data={props.questions}
                    key={nanoid()}
                />
            }
                  
        </div>
    
    )
}