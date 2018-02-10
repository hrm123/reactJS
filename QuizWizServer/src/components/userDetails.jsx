import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './header';

class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
      <Header step="1" />
      <div className="step step1">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <div className="form-group col-md-12 content form-block-holder">
              <label className="control-label col-md-4">
                            Email
              </label>
              <div>
                <input
                  autoComplete="off"
                  type="email"
                  placeholder="john.smith@example.com"
                  className="form-control"
                  required
                  defaultValue={this.state.email}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

UserDetails.propTypes = {
  email: PropTypes.string.required,
};

export default UserDetails;
