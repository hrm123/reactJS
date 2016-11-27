import React,{Component} from 'react';


class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state = { term: '' }
    }

    render(){
        return (
         <div className="search-bar">
            <input
            value = {this.state.term}
            onChange={evnt => this.onInputChange(evnt.target.value)}/>
            <p>Value of the input: {this.state.term}</p>
         </div>
        )
    }

    onInputChange(term){
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
    
};

export default SearchBar;