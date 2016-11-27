import React, { Component } from 'react';

/*
const SearchBar = () => {
    return <input />;
}
*/ //functional component

class HelloWorld extends Component {
     
     constructor(props){
         super(props);
         this.state = { term: '', init: 'Input your name'}; // only insicde cosntructor direct assignment is done.. else where setState method is used
     }
     
    render() {
        return (
          <div>
            <input placeholder={this.state.init} onChange={(evnt) => this.setState({ term :evnt.target.value})} /> 
            <p/>Hello {this.state.term}
        </div>
        );
    };
    
} //class component

export default HelloWorld;