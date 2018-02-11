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
      <section style={{ background: '#efefe9' }}>
        <div className="container">
          <div className="row">
            <div className="board">
              <Header step="1" />
              <div className="tab-content">
                <div className="tab-pane fade in active">
                  <h4 className="head text-center">step1</h4>
                  <br />
                  <form id="Form">
                    <div className="row">
                      <div className="col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8">
                        <div className="form-group">
                          <label className="control-label">Email</label>
                          <input
                            autoComplete="off"
                            type="email"
                            placeholder="john.smith@example.com"
                            className="form-control input-md"
                            required
                            defaultValue={this.state.email}
                          />
                        </div>
                        <div className="form-group text-center">
                          <button className="btn btn-success btn-outline-rounded btn-info"> Next <span style={{ 'margin-left': '10px;' }} className="glyphicon glyphicon-arrow-right" /></button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

UserDetails.propTypes = {
  email: PropTypes.string.isRequired,
};

export default UserDetails;
