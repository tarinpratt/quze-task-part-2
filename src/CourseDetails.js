import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []   
        }
    }   
    componentDidMount() {
        const selectedId = this.props.match.params.courseId
        const url = 'https://staging-api.quze.co/search/intern-test/_search';
        const data = {query:{match:{courseId: selectedId}}};
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
        const results = this.state.result.map((i) => {
            return i._source;
          })
        const resultDetails = results.map((i, index) => (
                <section key={index} className="filteredResults">
                <Link to="/" className="backLink"><button className="backButton"><FontAwesomeIcon icon={faArrowLeft} size="2x" className="arrow"/></button></Link>
                <img 
                src={i.imgUrl}
                alt="catalogue"
                className="responsive"
                />
                <h2>{i.title}</h2>
                <p>{i.shortDescription}</p>
                <a href={i.url} className="goToLink">Go to Course site</a>
                <p>Rated: {i.providerRatings}</p>
                <p>Level: {i.level}</p>
                <p>{i.programType}</p>
                <p>{i.quzeCategory}</p>  
                </section>
                )); 
        return (
            <div>{resultDetails}</div>
        )
    }
}
export default CourseDetails;