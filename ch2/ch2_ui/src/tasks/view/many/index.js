import React, { Component } from 'react';
import {connect} from 'react-redux'

import loading from "../../../images/loading.svg"

import appStore  from "../../../redux/store"
import {getTasks} from "../../redux/selectors";
import { getTasks as fetchTasks, addTask, updateTask, delTask } from "../../redux/actions";
import { getLoggedIn } from "../../../login/redux/selectors"
import {getAddState, getDelState, getUpdateState} from "../../redux/selectors/index";

const Tasks = (props)=>{

    const tasklist = props.tasks.map((task,idx)=>{

            if(task._id === props.edit && props.isLoggedIn){
                return(
                    <div key={task._id} className="task edit">
                        <div className="input">
                            <input type="text" id="" name={task._id} value={props.editVal} onChange={props.onChangeFunc} />
                        </div>
                        <div className="ctrls">
                            <div className="ctrl" onClick={props.saveTaskFunc}>
                                save
                            </div>
                            {props.updateState.running &&
                                <div className="loading">
                                    <img src={loading} alt="loading"/>
                                </div>
                            }
                            <div className="ctrl" onClick={props.cancelEditTaskFunc}>
                                cancel
                            </div>
                        </div>
                    </div>
                )
            }

            return(
                <div key={task._id} className="task normal noselect">
                    <div className="content" onDoubleClickCapture={props.editTaskFunc.bind(props.BindCtx,task)}>
                        {task.content}
                    </div>

                    {props.isLoggedIn &&
                        <div className="ctrls">
                            <div className="ctrl" onClick={props.delTaskFunc.bind(props.BindCtx,task)}>
                                del
                            </div>
                            {props.delState.running &&
                            <div className="loading">
                                <img src={loading} alt="loading"/>
                            </div>
                            }
                        </div>
                    }

                </div>
            )
        });

    return tasklist
};

class TasksViewMany extends Component {
    constructor(props){
        super(props);

        const bindList = [
            "addTask",
            "editTask",
            "cancelEditTask",
            "saveTask",
            "delTask",
            "onChange"
        ];

        const propList = {
            "module_name":"tasks_view_many_module",
            "state":{
                "edit":"",
                "editVal":""
            }
        };

        bindList.map((toBind) => this[toBind] = this[toBind]["bind"](this));
        Object.keys(propList).map((prop) => this[prop] = propList[prop]);

        appStore.dispatch(fetchTasks());
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps["updateState"]["running"] && nextProps["updateState"]["status"] === "success"){
            this.setState({"edit":"","editVal":""})
        }
    }

    delTask(task){
        appStore.dispatch(delTask(task))
    }

    saveTask(){
        const new_task = {
            "_id":this.state.edit,
            "content":this.state.editVal
        };

        appStore.dispatch(updateTask(new_task))
    }
    cancelEditTask(){
        this.setState({"edit":"","editVal":""})
    }

    onChange(evt){
        const target = evt.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({"editVal":value})
    }

    editTask(task){
        if(!this.props.isLoggedIn){
            alert("Please login to edit a task")
        }
        console.log("Edit task : ",task);
        this.setState({"edit":task._id,"editVal":task.content})
    }

    addTask(){

        const new_task = {
            "content":"New task"
        };

        appStore.dispatch(addTask(new_task))
    }
    render() {
        return (
            <div id={this.module_name}>
                <div className="tasksArea">
                    <div className="tasksHeader">
                        Tasks <span className="subscript">( login to add or edit task. double click task to edit it )</span>
                    </div>
                    <div className="tasksList">

                        <Tasks tasks={this.props.tasks}
                               BindCtx={this}
                               editTaskFunc={this.editTask}
                               onChangeFunc={this.onChange}
                               saveTaskFunc={this.saveTask}
                               delTaskFunc={this.delTask}
                               cancelEditTaskFunc={this.cancelEditTask}
                               edit={this.state.edit}
                               editVal={this.state.editVal}
                               isLoggedIn={this.props.isLoggedIn}
                               updateState={this.props.updateState}
                               delState={this.props.delState}
                        />


                        {this.props.isLoggedIn &&
                            <div className="task ctrl">
                                <div className="content" onClick={this.addTask}>
                                    + <span className="underline">Add task</span>
                                </div>
                                {this.props.addState.running &&
                                    <div className="loading">
                                        <img src={loading} alt="loading"/>
                                    </div>
                                }
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ tasks:getTasks(state),
                isLoggedIn:getLoggedIn(state),
                addState:getAddState(state),
                updateState:getUpdateState(state),
                delState:getDelState(state) })
)(TasksViewMany)
