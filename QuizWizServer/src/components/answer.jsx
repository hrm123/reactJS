import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sel: this.props.id === this.props.ua,
    };
  }
    answerChanged = (changeEvent) => {
      const dataChange = {
        answerId: this.props.id,
        questionId: this.props.qid,
        stepId: this.props.sid,
        sel: changeEvent.target.value,
      };
      this.setState({ sel: (changeEvent.target.value === 'on') });
      this.props.onUpdate(dataChange);
    }

    render() {
      const { ua } = this.props;
      return (
        <div className="row">
          <div className="col-sm-12" style={{ textAlign: 'left' }}>
            <label>
              <input
                type="radio"
                name={this.props.groupName}
                onChange={this.answerChanged}
              />&nbsp;&nbsp;{ua}
            </label>
          </div>
        </div>

      );
    }
}

Answer.propTypes = {
  ua: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  qid: PropTypes.string.isRequired,
  sid: PropTypes.number.isRequired,
};
