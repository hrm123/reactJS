import React,{Component} from 'react';

const VideoListItem = ({Video,key, onVideoSelect}) => {
    const imageUrl = Video.snippet.thumbnails.default.url;
    return(
         <li className="list-group-item" key={key} onClick={() => onVideoSelect(Video)}>
            <div className="video-list media-object" >
                <div className="media-left">
                    <img className="media"  src={imageUrl}/>
                </div>
                <div className="media-body">
                    <div  className="media-heading" >{Video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
};

export default VideoListItem;