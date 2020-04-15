import React , { Component }from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import SearchSelect from './SearchSelect';
import SearchTitle from './SearchTitle';
import SearchCategory from './SearchCategory';
import SearchRating from './SearchRating';
import CourseDetails from './CourseDetails';
import './App.css';

class App extends Component {

  render() {
    return(
      <main className="App">
        <Header />
        <Route exact path='/' component={SearchSelect}/>
        <Route path='/Search/Title' component={SearchTitle}/>
        <Route path='/Search/Rating' component={SearchRating}/>
        <Route path='/Search/Cagtegory' component={SearchCategory}/>
        <Route path='/course/:courseId' component={CourseDetails} />
      </main>
    )
  }   
}
export default App;