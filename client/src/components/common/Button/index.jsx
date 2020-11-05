import React from 'react';

const Button = ({
  label,
  type = 'button',
  className = 'btn btn-primary',
  ...rest
}) => {
  return (
    <button type={type} className={className} {...rest}>
      {label}
    </button>
  );
};

export default Button;
