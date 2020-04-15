import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';

class SearchRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result:[],
            searchedRatings: ''  
        }
    }
      static defaultProps = {
        store: {
          catalogues: []
        }
      };

      searchRatings = e => {
        this.setState({ searchedRatings: e.target.value })
      };

      handleSubmit = event => {
        event.preventDefault();
        const url = 'https://staging-api.quze.co/search/intern-test/_search';
        const data = {query:{match:{providerRatings: this.state.searchedRatings}}};
        if(this.state.searchedRatings === "") {
            alert('You must select a Rating');
        } else {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        }).then(res => 
            (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json())
        .then(response => this.setState ({
            result: response.hits.hits
        }) ); 
    }}
      render() {
//search select for ratings
        const ratingList = store.catalogues.map((i, index, arr) => {
          return i.providerRatings;
        })
        const reducedRating = ratingList.reduce((unique, item) => {
          return unique.includes(item) ? unique : [...unique, item]
        }, []);
        const ratingsSorted = reducedRating.sort();
        ratingsSorted.pop();       
//access results from api
        const results = this.state.result.map((i) => {
            return i._source;
          })
        const resultList = results.map((i, index) => (
        <ul key={index} className="filteredResults">
                    <li>
                    <img 
                    src={i.imgUrl}
                    alt="catalogue"
                    className="responsive"
                    />
                    </li>
                    <li>
                    <h2>{i.title}</h2>
                    </li>
                    <li>
                    <Link to={`/course/${i.courseId}`}>
                        <button className="moreDetailsButton">More Details</button>
                    </Link>
                </li>
                </ul>
                ));     
    return (
        <div className="search">
          <h2>Ratings</h2>
          <form onSubmit={this.handleSubmit}>
          <select value={this.state.searchedRatings} onChange={this.searchRatings}>
          <option value="none">Select a Rating</option>
          {ratingsSorted.map((rating, index) => {
           return (
             <option key={index} value={rating}> {rating} </option>
            )
            })}
          </select>
          <button type="submit" className="submitButton">submit</button>
          </form>
        <section className="searchResults">{resultList}</section>
        </div>
        )
    }
}
    export default SearchRating;
