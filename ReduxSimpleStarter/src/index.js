import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './Components/search_bar';
import YTSearch from 'youtube-api-search'


const API_KEY = 'AIzaSyDQyO2njO_yGO6H8kTM31LmpvydQHJXM-Q'



class App extends Component {
    constructor(props){
        super(props);
        this.state = { videos: [] };
        YTSearch({
        key:API_KEY,
        term: 'buildings'},
        (videos) => {
            this.setState({videos});
        });
    }

    render(){
    return (
        <div>
            <SearchBar />
        </div> 
        ); 
    }
}


ReactDOM.render(<App/>, document.querySelector('div#containerDiv'));
