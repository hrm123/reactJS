import React, { Component, PropTypes  } from 'react';
import { connect } from 'react-redux';
const TodosActions =  require("../actions/todosActions");
import { bindActionCreators } from 'redux';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Button from '../components/Button';
import TodoList from '../components/TodoList';
import TabBar from '../components/TabBar';
import '../App.css';

class Root extends Component{
    constructor(props){
        super(props);
        this.submitTodo = this.submitTodo.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.setType = this.setType.bind(this);
    }

    setType (type) {
        this.props.onSetType(type);
    }

    render(){
        const { todos } = this.props;
        const {inputVal, todos : todosList, taskStatus : type } = todos;
        return(   
                <div className="rootcontainer">
                    <div className="rootcontent">
                        <Heading />
                        <Input
                            inputValue={inputVal}
                            inputChange={this.inputChange}
                        /> 
                        <TodoList 
                            todos={todosList}  
                            toggleComplete={this.toggleComplete}
                            deleteTodo={this.deleteTask}
                            type={type}
                        />
                        <Button submitTodo={this.submitTodo} />
                    </div>
                    <TabBar type={type} setType={this.setType} />
                </div>
        );
    }
    submitTodo = () => {
        if(this.props.todos.inputValue.match(/^\s*$/)){
            return;
        }
        let todo = {
            "Task": this.props.todos.inputValue,
            "Complete": false,
            "taskType": "General",
             "TaskId": -1 // will be updated in tthe action method
        }

        this.props.onSubmitClick(todo);
    }

    deleteTask = (taskId) => {
        const { todos : todosList } = this.props.todos;
        const currentTodo = todosList.filter((td) => td.TaskId===taskId);
        if(currentTodo && currentTodo.length ===1){
            this.props.onDeleteTask(currentTodo[0]);
        }
    }

    toggleComplete = (taskId) => {
        const { todos : todosList } = this.props.todos;
        const currentTodo = todosList.filter((td) => td.TaskId===taskId);
        if(currentTodo && currentTodo.length ===1){
            this.props.onTaskChanged({TaskId: currentTodo[0].TaskId , Complete:!currentTodo[0].Complete});
        }
    }

    inputChange(nv){
        this.props.onTitleChanged(nv);
    }
}

Root.propTypes = {
    todos: PropTypes.object.isRequired
};




const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //actions: bindActionCreators(TodosActions, dispatch) -- can use this when you want to pass these dispatch methods to component that does not know about redux
        onSubmitClick: (todo) => {
            dispatch(TodosActions.addTodos(todo));
        },
        onTitleChanged:  (newVal) =>{
            dispatch(TodosActions.titleChanged(newVal));
        },
        onTaskChanged: (todo) => {
            dispatch(TodosActions.editTodos(todo));
        },
        onDeleteTask: (todo) => {
            dispatch(TodosActions.deleteTodos(todo));
        },
        onSetType: (type) =>{
            dispatch(TodosActions.todoTypeChanged(type));
        }
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);