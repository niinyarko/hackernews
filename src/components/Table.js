import React, { Component } from 'react';
import PropTypes from 'prop-types';

const isSearched = searchTerm => item => 
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

export default class Table extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    pattern: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }

  render() {
    const { list, pattern, onDismiss } = this.props;

    return (
      <div>
        { list.filter(isSearched(pattern)).map(item => {
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button type="button" onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}