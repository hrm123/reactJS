import React, {Component} from 'react';
import {subsribeToConnectionEvent} from './api';

export class Connection extends Component{
    state = {
        connectionState: 'connecting'
    }

    constructor(props){
        super(props);
        subsribeToConnectionEvent(({
            state: connectionState,
            port
        }) => {
            debugger;
            this.setState({
                connectionState,
                port
            })
        })
    }

    render() {
        let content = null;
        if(this.state.connectionState === 'disconnected'){
            content = (
                <div className="Connection-error">
                    We've lost connection to our server
                </div>
            )
        }
        
        if(this.state.connectionState === 'connecting'){
            content = (
                <div className="Connection-error">
                    Connecting ...
                </div>
            )
        }

        return (
            <div className="Connection">
                <div className="Connection-port">
                    Socket port: {this.state.port}
                </div>
                {content}
            </div>
        )
    }
}