import React, { Component } from 'react';

class SearchBar extends Component {
     
     constructor(props){
         super(props);
         this.state = { term: '', init: 'Type in search term'}; 
     }
     
    render() {
        return (
          <div>
            <input placeholder={this.state.init} 
            onBlur={(evnt) => this.onInputChange(evnt.target.value) } /> 
        </div>
        );
    };

    onInputChange(term){
        debugger;
        this.setState({ term });
        this.props.onSearchTermChange(term);
    }
}
    

export default SearchBar;