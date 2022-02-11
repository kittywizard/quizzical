import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import QuizDisplay from "./QuizDisplay";
import Question from "../Question";
import Answer from '../Answer';
import quizdata from './quizdata';

beforeEach(cleanup);

// it('renders', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<QuizDisplay data={quizdata}/>, div);
// });

// it('testArray runs', () => {
//     expect(testArray(quizdata, tempArray).toBe(''))
// });

let tempVariable = "test";

it('console logs??', () => {
    expect(tempVariable).toBe("test")
});


let tempArray = [];
function testArray(prevState, tempArray) {
    for(let i = 0; i < prevState.length; i++) {
        tempArray = prevState[i];
        tempArray.map(answer => {
            if(copy === tempArray[v].answerCopy){
                tempArray[v].isSelected = !tempArray[v].isSelected;
                return [...prevState, tempArray];
                //need to add way to make sure it can only happen once
            } 
        });
        
    }
}

// //write a test to test this function ^^ 
// test('runs', () => {
//     expect(testArray()).toBe()
// })