import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';

class SearchTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            searchedTitle: '' 
        }
    }   
    static defaultProps = {
        store: {
          catalogues: []
        }
      };

    searchTitle = e => {
        this.setState({ searchedTitle: e.target.value })
      };
    
      handleSubmit = event => {
        event.preventDefault();
        const url = 'https://staging-api.quze.co/search/intern-test/_search';
        const data = {query:{match:{title: this.state.searchedTitle}}};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        }).then(res => res.json())
        .then(response => this.setState ({
            result: response.hits.hits
        }) ); 
    }
      render() {
        //sort the search title options
        const titleList = store.catalogues.map((i, index, arr) => {
            return i.title;
          })
        const reducedTitle = titleList.reduce((unique, item) => {
        return unique.includes(item) ? unique : [...unique, item]
        }, []);
        const titlesSorted = reducedTitle.sort();

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
            <h2>Titles</h2>
            <form onSubmit={this.handleSubmit}>
              <select className="searchTitleSelect" value={this.state.searchedTitle} onChange={this.searchTitle}>
              {titlesSorted.map((title, index) => {
               return (
                 <option key={index} value={title}> {title} </option>
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
    export default SearchTitle;