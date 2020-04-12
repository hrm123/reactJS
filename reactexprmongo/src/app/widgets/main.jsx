import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store';
import {ConnectedDashboard} from './dashboard';
import {Router, Route} from 'react-router-dom';
import {hstory} from '../store/history';
import {ConnectedNav} from './nav';
import {ConnectedTaskDetail} from './taskdetail';
import {Redirect} from 'react-router';
import {ConnectedSignin} from './signin';
import {ConnectedRegister} from './register';

const RouteGaurd = component => ({match}) => {
    console.info("Route gaurd", match);
    if(!store.getState().session.authenticated){
        return <Redirect to="/" />;
    } else{
        return <component match={match} />;
    }
}


export const Main = () => {
return (    
    <Router history={hstory}>
        <Provider store={store}>
            <div>
                <ConnectedNav />
                <Route  exact path="/dashboard" render={RouteGaurd(ConnectedDashboard)}/>
                <Route  exact path="/task/:id" render={RouteGaurd(ConnectedTaskDetail)}/>
                <Route exact path="/" component={ConnectedSignin} />
                <Route exact path="/register" component={ConnectedRegister} />
            </div>
        </Provider>
    </Router>
);
}