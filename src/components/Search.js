import React from 'react';
import { string, func } from  'prop-types';

Search.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
};

export default function Search({ value, onChange, children }) {
  return (
    <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}