import React from 'react';
import {connect} from 'react-redux';

export const TaskList = ({tasks, name}) => (
    <div>
        <h3>{name}</h3>
        <div>
            {tasks.map(t => (
                <div>{t.name}</div>
            ))
            }
        </div>
    </div>
)

function mapStateToProps(state, ownProps){
    let groupRef = ownProps.id;
    return {
        name: ownProps.name,
        ref: groupRef,
        tasks: state.tasks.filter(t => t.group === groupRef)
    }
}


export const ConnectedTaskList = connect(mapStateToProps)(TaskList);