/**
 * Created by Ramm on 2/10/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <div>step id: {props.step}</div>
);

Header.propTypes = {
  step: PropTypes.number.isRequired,
};

export default Header;