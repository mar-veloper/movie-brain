import React from 'react';

const Button = ({
  label,
  type = 'button',
  className = 'primary',
  isLoading,
  ...rest
}) => {
  return (
    <button type={type} className={`btn btn-${className}`} {...rest}>
      {isLoading ? (
        <div>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span class="sr-only">Loading...</span>{' '}
        </div>
      ) : (
        <>{label}</>
      )}
    </button>
  );
};

export default Button;
