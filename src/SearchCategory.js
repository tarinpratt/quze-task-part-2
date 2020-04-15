import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';

class SearchCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            searchedCategories: ''    
        }
    }   
      static defaultProps = {
        store: {
          catalogues: []
        }
      };

      searchCategories = e => {
        this.setState({ searchedCategories: e.target.value })
      };

      handleSubmit = event => {
          event.preventDefault();
          const url = 'https://staging-api.quze.co/search/intern-test/_search';
          const data = {query:{match:{quzeCategory: this.state.searchedCategories}}};
          if(this.state.searchedCategories === "") {
              alert('You must select a category')
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
            })); 
          }
      }
      render() {    
//search select for categories
        const list = store.catalogues.map((i, index, arr) => {
          return i.quzeCategory;
        })
        const reduced = list.reduce((unique, item) => {
          return unique.includes(item) ? unique : [...unique, item]
        }, []);
        const categoriesSorted = reduced.sort();
        categoriesSorted.pop();
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
          <h2>Categories</h2>
          <form onSubmit={this.handleSubmit}>
          <select className="searchTitleSelect" value={this.state.searchedCategories} onChange={this.searchCategories}>
          <option value="none">Select a Category</option>
          {categoriesSorted.map((category, index) => {
           return (
            <option key={index} value={category}> {category} </option>
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
    export default SearchCategory;

