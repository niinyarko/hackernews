import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';
import Table from './components/Table';
import Button from './components/Button';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const PARAM_PAGE = 'page=';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
  }

  onDismiss(id) {
    const { results, searchKey} = this.state;
    const isNotId = item => item.objectID !== id;
    const updatedList = results[searchKey].hits.filter(isNotId);
    this.setState({ 
      results: { 
        ...results, 
        [searchKey]: { ...results[searchKey], hits: updatedList } 
      } 
    });
  }

  needsToSearchTopstories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopstories(searchTerm)) {
      this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }
    event.preventDefault();
  }

  setSearchTopstories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = (results && results[searchKey])
      ? results[searchKey].hits
      : [];
    
    const updatedHits = [
      ...oldHits,
      ...hits,
    ];

    this.setState({ results: {...results, [searchKey]: {...result, hits: updatedHits ,page } } });
  }

  fetchSearchTopstories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
  }

  render() {
    const { results, searchTerm, searchKey } = this.state;
    console.log(results);
    const page = (
      results && 
      results[searchKey] && 
      results[searchKey].page
    ) || 0;

    const list = (
      results && 
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    if (!results) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm} 
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table
          list={list} 
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopstories(searchKey, page + 1)} 
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
