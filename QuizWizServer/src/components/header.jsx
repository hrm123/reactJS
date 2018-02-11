/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 * Created by Ramm on 2/10/2018.
 */
import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = () => (
          <div className="board-inner" id="status-buttons">
            <ul className="nav nav-tabs" id="myTab">
              <div className="liner" />

              <li>
                <Link to="/">
                  <span className="round-tabs one">
                    <i className="glyphicon glyphicon-user" />
                  </span>
                </Link>
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
);

export default Header;
