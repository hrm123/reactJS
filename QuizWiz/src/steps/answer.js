import React, { Component } from 'react';
import Promise from 'promise';

export default class Answer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {};
      }

    componentDidMount() {}

    componentWillUnmount() {}

    answerChanged = (changeEvent) => {
        const dataChange = {
            answerId : this.props.id,
            questionId : this.props.qid,
            stepId : this.props.sid,
            sel : changeEvent.target.value
        };
        this.props.onUpdate(dataChange);
    }

    render() {
        var ans = this.props.data;

        return (
            <div className="row">
                <div className="col-sm-12" style={{textAlign:"left"}}>
                    <input type="radio" aid={this.props.id} name={this.props.groupName} onChange={this.answerChanged.bind(this)}/>&nbsp;&nbsp;{ans}
                </div>
               
            </div>

        );
    }
}