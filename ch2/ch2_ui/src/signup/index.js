import React, { Component } from 'react';
import loading from "../images/loading.svg";
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import _ from "underscore";

import { signup } from "./redux/actions"
import appStore from "../redux/store";
import {getMessage, getRunning, getStatus} from "./redux/selectors/index";
import {signupFail} from "./redux/actions/index";

const BUTTONS = {
    SIGNUP:"signupBtn",
    BACK_TO_TASKS:"backToTasksBtn",
    LOGIN:"loginBtn",
};

class Signup extends Component {
    constructor(props){
        super(props);

        const bindList = ["onChange","onClick"];
        const propList = {
            "module_name":"signup_module",
            "state":{
                user:{
                    "name":"",
                    "template":""
                }
            }
        };

        bindList.map((toBind) => this[toBind] = this[toBind]["bind"](this));
        Object.keys(propList).map((prop) => this[prop] = propList[prop]);
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps["running"] && nextProps["status"] === "success"){
            const link = "/login";
            this.props.history.push(link);
        }
    }

    onClick(btn){
        let link = "";
        switch(btn){
            case BUTTONS.SIGNUP:
                appStore.dispatch(signup(this.state.user));
                break;
            case BUTTONS.BACK_TO_TASKS:
                appStore.dispatch(signupFail({}));
                link = "/";
                this.props.history.push(link);
                break;
            case BUTTONS.LOGIN:
                appStore.dispatch(signupFail({}));
                link = "/login";
                this.props.history.push(link);
                break;
            default:
                break;
        }
    }

    onChange(evt){
        const target = evt.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const user = { ...this.state.user};
        user[name] = value;

        this.setState({
            user:user
        });
    }

    render() {
        return (
            <div id={this.module_name}>
                <div className="signup_form">
                    <div className="header">
                        Tasker Signup
                    </div>
                    <div className="entry">
                        <div className="label">Name</div>
                        <div className="input">
                            <input type="text" name="name" value={this.state.user.name} onChange={this.onChange} placeholder="Name"/>
                        </div>
                    </div>
                    <div className="entry">
                        <div className="label">Username</div>
                        <div className="input">
                            <input type="text" name="username" value={this.state.user.username} onChange={this.onChange} placeholder="Username"/>
                        </div>
                    </div>
                    <div className="entry">
                        <div className="label">Password</div>
                        <div className="input">
                            <input type="password" name="password" value={this.state.user.password} onChange={this.onChange} placeholder="Password"/>
                        </div>
                    </div>
                    <div className="seperator"></div>
                    {this.props.running &&
                        <div className="loading">
                            <img src={loading} alt="loading"/>
                        </div>
                    }
                    {   !this.props.running &&
                        this.props.status === "fail" &&
                        !_.isEmpty(this.props.message) &&

                        <div className="error">
                            { (this.props.message || {})["msg"]}
                        </div>
                    }
                    <div className="ctrl">
                        <div className="content" onClick={this.onClick.bind(this,BUTTONS.SIGNUP)} >
                            Signup
                        </div>
                    </div>
                    <div className="ctrl">
                        <div className="content" onClick={this.onClick.bind(this,BUTTONS.BACK_TO_TASKS)} >
                            Back to tasks
                        </div>
                    </div>
                    <div className="ctrl">
                        <div className="content" onClick={this.onClick.bind(this,BUTTONS.LOGIN)} >
                            Login
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ running:getRunning(state), status:getStatus(state), message:getMessage(state)})
)(withRouter(Signup))

