import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import App from "./App";



test("renders App without crashing", () => {
  render(<App />);
});

test("can fill out form inputs correctly, submit, and verify submitted info", async () => {

  const { getByLabelText, getByPlaceholderText, getByTestId, findByDisplayValue } = render(<App />)

  const firstName = getByPlaceholderText(/edd/i)
  const lastName = getByPlaceholderText(/burke/i)
  const emailAddress = getByLabelText(/email*/i)
  const message = getByLabelText(/message/i)

  fireEvent.change(firstName, {target: {value:'Patrick'}})
  fireEvent.change(lastName, {target: {value:'Harl'}})
  fireEvent.change(emailAddress, {target: {value:'pat@gmail.com'}})
  fireEvent.change(message, {target: {value:'Some message'}})

  const submitBtn = getByTestId('submit-btn')
  fireEvent.click(submitBtn)

  const myFirstName = await findByDisplayValue(/patrick/i)
  const myLastName = await findByDisplayValue(/harl/i)
  const myEmail = await findByDisplayValue(/pat@gmail.com/i)
  const myMessage = await findByDisplayValue(/some message/i)

  expect(myFirstName).toBeInTheDocument()
  expect(myLastName).toBeInTheDocument()
  expect(myEmail).toBeInTheDocument()
  expect(myMessage).toBeInTheDocument()
  

})

test("validation is working", () => {


  const { getByDisplayValue, getByPlaceholderText, getByLabelText } = render(<App />)

  const firstName = getByPlaceholderText(/edd/i)
  const lastName = getByPlaceholderText(/burke/i)
  const emailAddress = getByLabelText(/email*/i)

  act(() => firstName.focus())

  expect(firstName).not.toHaveFocus()

  
})




