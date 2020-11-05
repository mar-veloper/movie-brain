import React from 'react';

const Input = React.forwardRef((props, ref) => {
  const {
    name,
    type = 'text',
    required = false,
    label,
    feedback,
    help,
    ...rest
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        ref={ref}
        type={type}
        className="form-control"
        id={name}
        aria-describedby={name}
        required={required}
        {...rest}
      />
      <div id={`${name}Feedback`} className="invalid-feedback">
        {feedback}
      </div>
      <small id={`${name}Help`} className="form-text text-muted">
        {help}
      </small>
    </div>
  );
});

export default Input;
