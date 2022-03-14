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

        tempArray.push({
            name: "All",
            id: 0,
            key: nanoid(),
            isSelected: false
        });
        
        setCategories(tempArray);
    }, []);


    function toggleStart() {
        const find = categories.find(selected => selected.isSelected === true)
        find != undefined ? setStartGame(true) : console.log("Please select a category to begin.")
    }

    function toggleCategories(id) {
        //check to ensure only one can be selected

        setCategories(prevState => prevState.map(category => {
            return category.id === id ?
                {...category, isSelected: !category.isSelected} :
                category
        }))
        
    }

    useEffect(() => {
        if(startGame) {
            //need to determine which category is Selected
            const result = categories.filter(category => category.isSelected === true)
            let url = `https://opentdb.com/api.php?amount=5&type=multiple`
           
            //check to see if result is not 0 - which means all (and no category needed)
           url += result[0].id !== 0 ? `&category=${result[0].id}` : '';
          
           console.log(url)
           fetch(url)
           .then(resp => resp.json())
           .then(data => {
               props.setQuestions(data.results)
           })
        }
    }, [startGame])

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

                <div className="categories">
                     {arrayCategories}
                </div>

                <button 
                    className="btn"
                    style={{display: "block"}}
                    onClick={toggleStart}
                >
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