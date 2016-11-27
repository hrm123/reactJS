import React from 'react';

const VideoDetail = ({video}) =>{

    if(!video){
        return <div>loading...</div>;
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return(
        <div className="video-detail col-md-8">
            <div className="embed-rresponsive embed-responsive-16by9">
                <iframe classsname="embed-rresponsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.declaration}</div>
            </div>
        </div>
    );
}

export default VideoDetail;