import React, { Component } from 'react';
import SearchTitle from './SearchTitle';
import SearchCategory from './SearchCategory';
import SearchRating from './SearchRating';

class SearchSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSearchOption: ''
        }
    }   
      onSelect = e => {
        this.setState({ selectedSearchOption: e.target.value})};
        
    render() {
        const searchOptions = ['Title', 'Category', 'Rating'];  
    return(
        <section className="searchOptions">
        <label htmlFor="searchFilterOptions">Search by:</label>
        <select id="searchFilterOptions" name="searchFilterOptions" value={this.state.selectedSearchOption} onChange={this.onSelect}>
            <option value="none">Select an Option</option>
            {searchOptions.map((option, index) => {
           return (
             <option key={index} value={option}> {option} </option>
            )
            })}
        </select>
          <section className="searchByCategory">
              {this.state.selectedSearchOption === 'Title' ? <SearchTitle /> : null}
              {this.state.selectedSearchOption === 'Category' ? <SearchCategory /> : null}
              {this.state.selectedSearchOption === 'Rating' ? <SearchRating /> : null}
          </section>
        </section>
         )
      }
}
    export default SearchSelect;