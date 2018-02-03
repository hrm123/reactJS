import React, { Component } from 'react';
import Promise from 'promise';

export default class Answer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {};
      }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        var ans = this.props.data;

        return (
            <div className="row">
                <div className="col-sm-12" style={{textAlign:"left"}}>
                    <input type="radio"  name={this.props.groupName}/>&nbsp;&nbsp;{ans}
                </div>
               
            </div>

        );
    }
}