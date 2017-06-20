import React from 'react';
import { string, func } from  'prop-types';
import Button from './Button';

Search.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired
};

export default function Search({ value, onChange, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
      <Button
        type="submit"
      >
        {children}
      </Button>
    </form>
  );
}