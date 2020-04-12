import React from 'react';
import {connect} from 'react-redux';
import {requestTaskCreation} from '../store/mutations';

export const TaskList = ({tasks, name,id, createNewTask}) => (
    <div>
        <h3>{name}</h3>
        <div>
            {tasks.map(t => (
                <div key={t.id}>{t.name}</div>
            ))
            }
        </div>
        <button onClick={()=> createNewTask(id)}>Add New</button>
    </div>
)

function mapStateToProps(state, ownProps){
    let groupRef = ownProps.id;
    return {
        name: ownProps.name,
        id: groupRef,
        tasks: state.tasks.filter(t => t.group === groupRef)
    }
}


const  mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createNewTask(id){
            console.log("creating new task ...", id);
            dispatch(requestTaskCreation(id));
        }
    }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);