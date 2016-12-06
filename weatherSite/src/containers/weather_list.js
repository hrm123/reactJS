import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { Sparklines, SparklinesLine} from 'react-sparklines';
import Chart from '../components/chart';

class WeatherList extends Component {

    constructor(props){
        super(props);
        //this.state =  {term :''};
        //this.onInputChange = this.onInputChange.bind(this); // needed so that this will be SearchBar Component in the call back
        //this.onFormSubmit = this.onFormSubmit.bind(this); 
    }

    

    renderCity(cityData) {
        const cityName = cityData.city.name;
        const temps = cityData.list.map( weather => weather.main.temp);
        
        return (
            <tr key={cityName}>
                <td>{cityName} </td>
                 <td>
                    <Chart data={temps} color="yellow" />
                 </td>
            </tr>

        );
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
                        <th>Pressure</th>
                        <th>Humidity</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderCity)}
                </tbody>
            </table>
        );
    }

    
}


function mapStateToProps({weather}){
    return { weather }; //{ weather } === {weather: weather}
}


export default connect(mapStateToProps)(WeatherList);