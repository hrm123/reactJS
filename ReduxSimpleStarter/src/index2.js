// Create a new component
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import HelloWorld from './components/hello_world';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';
import VideoDetail from  './components/video_detail';
const API_KEY = 'AIzaSyDQyO2njO_yGO6H8kTM31LmpvydQHJXM-Q'



class App extends Component{

    constructor(props){
        super(props);
        this.state = { 
            videos: [],
            selectedVideo: null
         }

         this.videoSearch('buildings');
    }

    videoSearch(term){
        YTSearch({key:API_KEY, term:term}, (videos) => {
            debugger;
            var term1 = term;
                this.setState({ 
                    videos:videos,
                    selectedVideo: videos[0]
                    });
            });
    }

    render(){
        return ( 
            <div>
                <SearchBar onSearchTermChange={ term => this.videoSearch(term) }/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos}/>
            </div>
        );
    }
}

/*
const App = () =>  {
    return ( 
        <div>
            <HelloWorld />
        </div>
    );
}
*/

// Put this components generrated HTML into the DOM of page

ReactDOM.render(<App />, document.querySelector('div.container')  );