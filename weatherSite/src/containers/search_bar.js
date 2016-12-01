import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';  // this is fn that makes sure that action flows through all reducers in the app
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {

    constructor(props){
        super(props);
        this.state =  {term :''};
        this.onInputChange = this.onInputChange.bind(this); // needed so that this will be SearchBar Component in the call back
        this.onFormSubmit = this.onFormSubmit.bind(this); 
    }
    
    onInputChange(evnt){
        this.setState({term: evnt.target.value })
    }

    onFormSubmit(evnt){
        evnt.preventDefault();
        //we need to go and fetch weather data
        this.props.fetchWeather(this.state.term);
        this.setState({term: ''});
    }

    render(){
        return (
            <form className="input-group" onSubmit={this.onFormSubmit}>
                <input 
                    placehodler="get a five-day forecast in your favorite cities"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button  type="submit" className="btn btn-secondary" >Submit</button>
                </span>
            </form>
        );
    }

    
}


// Anything returned from this fn will end up as props on the BookList container
function mapDispatchToProps(dispatch){
    //whenever selectBook action is called, the result should be passed to all reducers in the app
    return bindActionCreators({fetchWeather: fetchWeather}, dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar);