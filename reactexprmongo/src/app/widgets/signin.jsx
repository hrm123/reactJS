import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as mutations from '../store/mutations';


const SigninComponent = ({authenticateUser, authenticated}) => {
    return (
    <div>
        <h2>Signin here!</h2>
        <form onSubmit={authenticateUser}>
            <input type="text" placeholder="username" name="username" defaultValue="dev" />
            <input type="password" placeholder="password" name="password" defaultValue="" />
            {authenticated === mutations.NOT_AUTHENTICATED_USER ? 
            <p> Login incorrect</p> : null
            }
            <button type="submit">SIGNIN</button>
            <button type="submit">REGISTER</button>
        </form>
        <Link to="/register">
            REGISTER
        </Link>
    </div>
    );
}

const mapStateToProps = ({session}) =>({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUser(e) {
        e.preventDefault();
        let username = e.target['username'].value;
        let password = e.target['password'].value;
        dispatch(mutations.requestAuthenticateUser(username, password ));
    }
})

export const ConnectedSignin = connect(mapStateToProps, mapDispatchToProps)(SigninComponent);