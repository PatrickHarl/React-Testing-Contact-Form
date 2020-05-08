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

test("validation is working", async () => {


  const { findByTestId, getByPlaceholderText, getByLabelText } = render(<App />)

  const firstName = getByPlaceholderText(/edd/i)
  const lastName = getByPlaceholderText(/burke/i)
  const emailAddress = getByLabelText(/email*/i)

  act(() => {
    
    
    firstName.focus()
    firstName.blur()

    lastName.focus()
    lastName.blur()

    emailAddress.focus()
    emailAddress.blur()
    
  
  
  })

  const firstNameError = await findByTestId('firstname-err')
  const lastNameError = await findByTestId('lastname-err')
  const emailError = await findByTestId('email-err')

  expect(firstNameError).toHaveTextContent(/required/i)
  expect(lastNameError).toHaveTextContent(/required/i)
  expect(emailError).toHaveTextContent(/required/i)
  

  
})




