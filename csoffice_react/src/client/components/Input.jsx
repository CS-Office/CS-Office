import React from 'react';

const Input = (props) => {
  switch (props.type) {
    case 'text':
      return <input type="text" name={props.name} className={props.className} placeholder={props.placeHolder} />;
    case 'email':
      return (
        <input
          type="email"
          id="email"
          className="email-sign-in"
          name={props.name}
          required="true"
          placeholder="Email Address"
        />
      );
    case 'password':
      return (
        <input
          type="password"
          id={props.id}
          className={props.className ? props.className : 'password-sign-in'}
          name={props.name ? props.name : 'password'}
          required="true"
          placeholder={props.placeHolder ? props.placeHolder : 'Password'}
        />
      );
    case 'submit':
      return <input type="submit" className={props.className} value={props.value} />;
    default:
  }
};

export default Input;
