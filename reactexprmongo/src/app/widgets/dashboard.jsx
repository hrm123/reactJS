import React from 'react';
import {connect} from 'react-redux';
import {ConnectedTaskList} from './tasklist';

export const Dashboard = ({groups}) => (
    <div>
        <h2>Dashboard</h2>
        {groups.map(g => (
            <ConnectedTaskList key={g.id} id={g.id} name={g.name} />
        ))
        }
    </div>
)

function mapStateToProps(state){
    return {
        groups: state.groups
    }
}


export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);