import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true })}
          />
          {errors.firstName && (
            <p data-testid='firstname-err'>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p data-testid='lastname-err'>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input id="email" name="email" ref={register({ required: true })} />
          {errors.email && (
            <p data-testid='email-err'>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" ref={register({ required: false })} />
        </div>
        <div>
          <label htmlFor="signup">Signup?</label>
          <input type="checkbox" id="signup" name="signup" value="signup" />
        </div>
        {data && (
          <pre style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input data-testid='submit-btn' type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
