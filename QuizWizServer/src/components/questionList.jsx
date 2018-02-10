import React, { Component } from 'react';
import Promise from 'promise';
import Question from './question';

export default class QuestionList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {};
      }

    componentDidMount() {}

    componentWillUnmount() {}
    render(){
        console.log(this.props.questions);
        var qs = this.props.questions.map((q,i) => <Question key={i} id={i} sid={this.props.sid} question={q} onUpdate={this.props.onUpdate} userAnswer={q.userAnswer}/>)
        return (
            <p>
            <div className="container">
                <div className="row">
                    {qs}
                </div>
            </div>
            </p>

        );
    }
}