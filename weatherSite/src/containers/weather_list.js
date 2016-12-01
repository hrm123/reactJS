import React, { Component } from 'react';


export default class WeatherList extends Component {

    constructor(props){
        super(props);
        //this.state =  {term :''};
        //this.onInputChange = this.onInputChange.bind(this); // needed so that this will be SearchBar Component in the call back
        //this.onFormSubmit = this.onFormSubmit.bind(this); 
    }
    
    /*
    onInputChange(evnt){
        this.setState({term: evnt.target.value })
    }

    onFormSubmit(evnt){
        evnt.preventDefault();
        //we need to go and fetch weather data
        this.props.fetchWeather(this.state.term);
        this.setState({term: ''});
    }
    */

    render(){
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        );
    }

    
}
