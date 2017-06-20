import React from 'react';
import { func, string } from 'prop-types';

Button.propTypes = {
  onClick: func,
  className: string,
  type: string
};

export default function Button({ onClick, className = '', children, type = 'button' }) {
  return (
    <button
        type={type}
        className={className}
        onClick={onClick}
      >
      {children}
    </button>
  );
};