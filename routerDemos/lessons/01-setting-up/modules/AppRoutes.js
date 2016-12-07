import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App'
// insert into index.js
import About from './About'
import Repos from './Repos'

export default React.createClass( {
    render(){
    return (
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/repos" component={Repos}/>
            <Route path="/about" component={About}/>
        </Router>
    );

    }
});