import React,{Component} from 'react';


class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state = { term: '' }
    }

    render(){
        return (
         <div>
            <input
            value = {this.state.term}
            onChange={evnt => this.setState( {term: evnt.target.value})}/>
            <p>Value of the input: {this.state.term}</p>
         </div>
        )
    }

    
};

export default SearchBar;