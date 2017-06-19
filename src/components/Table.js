import React from 'react';
import { array, string, func } from 'prop-types';
import Button from './Button';

const isSearched = searchTerm => item => 
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const largeColumn = {
  width: '40%',
};
const midColumn = {
  width: '30%',
};
const smallColumn = {
  width: '10%',
};

Table.propTypes = {
  list: array.isRequired,
  pattern: string.isRequired,
  onDismiss: func.isRequired
};

export default function Table({ list, pattern, onDismiss }) {
  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item => {
        return (
          <div key={item.objectID} className="table-row">
            <span
              style={largeColumn}
            >
              <a href={item.url}>{item.title}</a>
            </span>
            <span
              style={midColumn}
            >
              {item.author}
            </span>
            <span
              style={smallColumn}
            >
              {item.num_comments}
            </span>
            <span
              style={smallColumn}
            >
              {item.points}
            </span>
            <span
              style={smallColumn}
            >
              <Button
                onClick={() => onDismiss(item.objectID)}
                className="button-inline"
              >
                Dismiss
                  </Button>
            </span>
          </div>
        );
      })}
    </div>
  );
}