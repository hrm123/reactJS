import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Nav = () => (
    <div>
        <Link to="/dashboard">
            <h1>
                My Dashboard
            </h1>
        </Link>
    </div>
)


export const ConnectedNav = connect(state=>state)(Nav);