import React, { Component } from 'react';
import Promise from 'promise';

export default class Answer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            sel : this.props.id === this.props.ua
        }
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
        debugger;
        this.setState({sel: (changeEvent.target.value === "on") ? true: false});
        this.props.onUpdate(dataChange);
    }

    render() {
        const ans = this.props.data;
        return (
            <div className="row">
                <div className="col-sm-12" style={{textAlign:"left"}}>
                <label>
                            <input type="radio"
                                name={this.props.groupName} 
                                onChange={this.answerChanged.bind(this)}
                                checked={this.state.sel}
                            />&nbsp;&nbsp;{ans}</label>
                        </div> 
            </div>

        );
    }
}