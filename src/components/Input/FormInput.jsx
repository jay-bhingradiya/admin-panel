import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { CSSTransition } from "react-transition-group";

const FormInput = (props) => {
  const {
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    id,
    ...rest
  } = props;

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (error) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [error]);

  return (
    <div>
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          autoComplete="off"
          className="form-input"
          style={error ? { border: "1px solid red" } : {}}
          {...rest}
        />

        <CSSTransition
          in={hasError}
          timeout={500}
          classNames="my-element"
          unmountOnExit
          // onEnter={() => setHasError(false)}
          // onExited={() => setHasError(false)}
        >
          <small style={{ color: "red" }}>{error}</small>
        </CSSTransition>
      </div>
    </div>
  );
};

export default FormInput;
