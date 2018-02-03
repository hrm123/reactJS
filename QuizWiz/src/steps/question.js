import React, { Component } from 'react';
import Promise from 'promise';
import Answer from './answer';

export default class Question extends Component {
    constructor(props) {
        super(props);
    
        this.state = {};
      }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        var q = this.props.question;
        console.log(q);
        const ans = q.answers.map( (a,i) => <Answer data={a} key={i} groupName={q.id}/> );
        debugger;
        return (
            <div className="container">
                <div className="row" style={{textAlign:"left"}}>
                    <h1 className="App-title">{q.question}</h1>
                </div>
                <div className="row">
                    {ans}
                </div>
            </div>

        );
    }
}