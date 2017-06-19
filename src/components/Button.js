import React from 'react';
import { func, string } from 'prop-types';

Button.propTypes = {
  onClick: func.isRequired,
  className: string.isRequired
};

export default function Button({ onClick, className, children }) {
  return (
    <button
        type="button"
        className={className}
        onClick={onClick}
      >
      {children}
    </button>
  );
};