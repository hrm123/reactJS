import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as mutations from '../store/mutations';


const RegisterComponent = ({authenticateUser, authenticated, registerUser}) => {
    return (
    <div>
        <h2>Register here!</h2>
        <form onSubmit={registerUser}>
            <input type="text" placeholder="username" name="username" defaultValue="dev" />
            <input type="password" placeholder="password" name="password" defaultValue="" />
            {authenticated === mutations.NOT_AUTHENTICATED_USER ? 
            <p> Login incorrect</p> : null
            }
            <button type="submit">REGISTER</button>
        </form>
        <Link to="/">
            SIGNON
        </Link>
    </div>
    );
}

const mapStateToProps = ({session}) =>({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    registerUser(e) {
        e.preventDefault();
        let username = e.target['username'].value;
        let password = e.target['password'].value;
        dispatch(mutations.requestRegisterUser(username, password ));
    }
})

export const ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);