import React,{Component} from 'react';
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
import {subscribeToUserAuthStatus} from '../apiHelper';

const RouteGaurd = Component => ({match}) => {
    console.info("Route gaurd", match);
    if(!store.getState().session.authenticated){
        return <Redirect to="/" />;
    } else{
        debugger;
        return <Component match={match} />;
    }
}


export class  Main extends Component {

    constructor(props){
        super(props);
        subscribeToUserAuthStatus((authStatus)=> {
            console.log('authStatus', authStatus);
            debugger;
        })
    }


    render(){
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
}