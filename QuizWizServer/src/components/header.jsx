/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * Created by Ramm on 2/10/2018.
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = () => (
  <section style={{ background: '#efefe9' }}>
    <div className="container">
      <div className="row">
        <div className="board">
          <div className="board-inner" id="status-buttons">
            <ul className="nav nav-tabs" id="myTab">
              <div className="liner" />

              <li>
                <span className="round-tabs one">
                  <i className="glyphicon glyphicon-user" />
                </span>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/step">
                  <span className="round-tabs two">
                    <i className="glyphicon glyphicon-tasks" />
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/summary">
                  <span className="round-tabs three">
                    <i className="glyphicon glyphicon-home" />
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/scores">
                  <span className="round-tabs four">
                    <i className="glyphicon glyphicon-ok" />
                  </span>
                </Link>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Header;
