import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const VideoDetail  = ({Video}) => {
    if(Video === null) return <div>Loading ... </div>;
    const  videoId = Video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}` ;
    return (
        <div className="VideoDetail-detail col-md-8" >
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{Video.snippet.title}</div>
                <div>{Video.snippet.description}</div>
            </div>
        </div>
    );
};

export default VideoDetail ;