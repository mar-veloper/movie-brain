import React from 'react';

const Button = ({ label, type = 'button', className = 'primary', ...rest }) => {
  return (
    <button type={type} className={`btn btn-${className}`} {...rest}>
      {label}
    </button>
  );
};

export default Button;
