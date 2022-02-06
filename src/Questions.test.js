import Questions from "./components/Questions";
import {cleanup, fireEvent, render} from '@testing-library/react';
import {React, useEffect, useState} from "react";

afterEach(cleanup);

// it('CheckboxWithLabel changes the text after click', () => {
//     const {queryByLabelText, getByLabelText} = render(
//       <Questions />,
//     );
  
//     expect(queryByLabelText(/off/i)).toBeTruthy();
  
//     fireEvent.click(getByLabelText(/off/i));
  
//     expect(queryByLabelText(/on/i)).toBeTruthy();
//   });