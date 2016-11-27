import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './Components/search_bar';
import VideoList  from './Components/video_list';
import YTSearch from 'youtube-api-search'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyDQyO2njO_yGO6H8kTM31LmpvydQHJXM-Q'



class App extends Component {
    constructor(props){
        super(props);
        this.state = { 
            videos: [],
            selectedVideo : null 
        };
        YTSearch({
        key:API_KEY,
        term: 'buildings'},
        (videos) => {
            this.setState({
                videos : videos,
                selectedVideo: videos[0],
                selected: 0
            });
        });
    }

    render(){
    return (
        <div>
            <SearchBar />
            <VideoDetail Video={this.state.selectedVideo}/>
            <VideoList 
             onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
             Videos={this.state.videos}/>
        </div> 
        ); 
    }
}


ReactDOM.render(<App/>, document.querySelector('div#containerDiv'));
