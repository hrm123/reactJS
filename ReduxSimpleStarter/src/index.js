import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './Components/search_bar';
import VideoList  from './Components/video_list';
import YTSearch from 'youtube-api-search'
import VideoDetail from './components/video_detail'
import _ from 'lodash';
const API_KEY = 'AIzaSyDQyO2njO_yGO6H8kTM31LmpvydQHJXM-Q'



class App extends Component {
    constructor(props){
        super(props);
        this.state = { 
            videos: [],
            selectedVideo : null 
        };
        this.videoSearch('buildings');
    }

    videoSearch(term){
        YTSearch({
            key:API_KEY,
            term: term},
            (videos) => {
                this.setState({
                    videos : videos,
                    selectedVideo: videos[0],
                    selected: 0
                });
            });
    }

    render(){

        const videoSearchNew = _.debounce((term) => { this.videoSearch(term)}, 300); // throttle -  videoSearchNew will work only once every 300ms

        return (
            <div>
                <SearchBar onSearchTermChange={term => videoSearchNew(term)} />
                <VideoDetail Video={this.state.selectedVideo}/>
                <VideoList 
                onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
                Videos={this.state.videos}/>
            </div> 
            ); 
    }
}


ReactDOM.render(<App/>, document.querySelector('div#containerDiv'));
