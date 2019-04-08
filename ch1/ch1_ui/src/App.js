import React, { Component } from 'react';
import {connect} from 'react-redux';
import loading from "./images/loading.svg";
import appStore from "./redux/store";
import moment from "moment";

import {runCommand} from "./commands/redux/actions"
import {getCommandsRunState} from "./commands/redux/selectors"

import {getMessages} from "./messages/redux/selectors"
import {addMessage} from "./messages/redux/actions"

import './App.css';

class App extends Component {
  constructor(props){
    super(props);

      const bindList = [
          "handleKeyPress",
          "handleChange"
      ];

      const propList = {
          "state":{
              "cmd_str":"",
              "cmd_history":{
                  "cmds":[],
                  "iter":0
              }
          }
      };

      bindList.map((toBind) => this[toBind] = this[toBind]["bind"](this));
      Object.keys(propList).map((prop) => this[prop] = propList[prop])
  }

    componentDidMount() {
        const objDiv = document.getElementById("messageList");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    componentDidUpdate(){
        const objDiv = document.getElementById("messageList");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    handleKeyPress(evt) {
        if(evt.key === "ArrowDown"){
            const cmds = this.state.cmd_history.cmds || [];
            const cmd = cmds[this.state.cmd_history.iter] || "";
            let iter = this.state.cmd_history.iter;

            if(iter < (cmds.length-1)){
                iter = iter + 1;
            }

            this.setState({cmd_str: cmd,cmd_history:{cmds:cmds,iter:iter}});
        }

        if(evt.key === "ArrowUp"){
            const cmds = this.state.cmd_history.cmds || [];
            const cmd = cmds[this.state.cmd_history.iter] || "";
            let iter = this.state.cmd_history.iter;

            if(iter > 0){
                iter = iter - 1;
            }

            this.setState({cmd_str: cmd,cmd_history:{cmds:cmds,iter:iter}});
        }

        if (evt.key === 'Enter') {
            const command = this.state.cmd_str;
            let cmds = this.state.cmd_history.cmds || [];
            cmds.push(command);
            const iter = (cmds.length-1);
            this.setState({cmd_str: "",cmd_history:{cmds:cmds,iter:iter}});
            const message = {
                _id:moment().utc()+"",
                type:"command",
                content:command
            };
            appStore.dispatch(addMessage(message));
            appStore.dispatch(runCommand(command));
        }
    }

    handleChange(evt) {
        this.setState({cmd_str: evt.target.value});
    }

  render() {
    return (
        <div className="main_app">
            <div className="help">

                <div className="header">
                    Commands
                </div>
                <div className="subheader">
                    &lsaquo; Terminal &rsaquo;
                </div>
                <div className="command">
                    <div className="cmd">
                        /add_terminal
                    </div>
                    <div className="input">
                        tag:"[ terminal tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /add_terminal tag:"nsambya"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /get_revenue
                    </div>
                    <div className="input">
                        terminal:"[ terminal tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /get_revenue terminal:"nsambya"
                    </div>
                </div>

                <div className="subheader">
                    &lsaquo; Ferry &rsaquo;
                </div>

                <div className="command">
                    <div className="cmd">
                        /add_ferry
                    </div>
                    <div className="input">
                        tag:"[ ferry tag ]"
                    </div>
                    <div className="input">
                        terminal:"[ terminal tag ]"
                    </div>
                    <div className="input">
                        type:"[ small | large ]"
                    </div>
                    <div className="eg">
                        e.g >> /add_ferry tag:"the_great_gatsby" terminal:"nsambya" type:"small"
                    </div>
                </div>

                <div className="subheader">
                    &lsaquo; Station &rsaquo;
                </div>

                <div className="command">
                    <div className="cmd">
                        /add_station
                    </div>
                    <div className="input">
                        tag:"[ station tag ]"
                    </div>
                    <div className="input">
                        terminal:"[ terminal tag ]"
                    </div>
                    <div className="input">
                        type:"[ gas ]"
                    </div>
                    <div className="eg">
                        e.g >> /add_station tag:"nsambya_station" terminal:"nsambya" type:"gas"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /refuel
                    </div>
                    <div className="input">
                        vehicle:"[ vehicle tag ]"
                    </div>
                    <div className="input">
                        station:"[ station tag ]"
                    </div>
                    <div className="input">
                        gas:"[ gas amount in % ( defaults to 100 ) ]"
                    </div>
                    <div className="eg">
                        e.g >> /refuel vehicle:"uas4100" station:"nsambya_station" gas:"80"
                    </div>
                </div>

                <div className="subheader">
                    &lsaquo; Inspection &rsaquo;
                </div>

                <div className="command">
                    <div className="cmd">
                        /add_inspection
                    </div>
                    <div className="input">
                        tag:"[ inspection tag ]"
                    </div>
                    <div className="input">
                        terminal:"[ terminal tag ]"
                    </div>
                    <div className="input">
                        type:"[ customs ]"
                    </div>
                    <div className="eg">
                        e.g >> /add_inspection tag:"nsambya_customs" terminal:"nsambya" type:"customs"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /inspect
                    </div>
                    <div className="input">
                        vehicle:"[ vehicle tag ]"
                    </div>
                    <div className="input">
                        inspection:"[ inspection tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /inspect inspection:"nsambya_customs" vehicle:"uas4100"
                    </div>
                </div>

                <div className="subheader">
                    &lsaquo; Employee &rsaquo;
                </div>

                <div className="command">
                    <div className="cmd">
                        /add_employee
                    </div>
                    <div className="input">
                        tag:"[ employee tag ]"
                    </div>
                    <div className="input">
                        terminal:"[ terminal tag ]"
                    </div>
                    <div className="input">
                        salary:"[ % of ticket charge (defaults to 10) ]"
                    </div>
                    <div className="eg">
                        e.g >> /add_employee tag:"sam" terminal:"nsambya" salary:"11"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /get_income
                    </div>
                    <div className="input">
                        employee:"[ employee tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /get_income employee:"sam"
                    </div>
                </div>

                <div className="subheader">
                    &lsaquo; Vehicle &rsaquo;
                </div>
                <div className="command">
                    <div className="cmd">
                        /add_vehicle
                    </div>
                    <div className="input">
                        tag:"[ vehicle tag ]"
                    </div>
                    <div className="input">
                        type:"[ car | van | bus | truck ]"
                    </div>
                    <div className="input">
                        gas:"[ % of gas left (defaults to random value between 0 and 100) ]"
                    </div>
                    <div className="eg">
                        e.g >> /add_vehicle tag:"uas4100" type:"car" gas:"100"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /park_vehicle
                    </div>
                    <div className="input">
                        vehicle:"[ vehicle tag ]"
                    </div>
                    <div className="input">
                        ferry:"[ ferry tag ]"
                    </div>
                    <div className="input">
                        employee:"[ employee tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /park_vehicle employee:"sam" ferry:"the_great_gatsby" vehicle:"uas4100"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /open_cargo_doors
                    </div>
                    <div className="input">
                        vehicle:"[ vehicle tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /open_cargo_doors vehicle:"uas4100"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /close_cargo_doors
                    </div>
                    <div className="input">
                        vehicle:"[ vehicle tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /close_cargo_doors vehicle:"uas4100"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /view_log
                    </div>
                    <div className="input">
                        vehicle:"[ vehicle tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /view_log vehicle:"uas4100"
                    </div>
                </div>

                <div className="subheader">
                    &lsaquo; General &rsaquo;
                </div>

                <div className="command">
                    <div className="cmd">
                        /show
                    </div>
                    <div className="input">
                        terminal:"[ terminal tag ]"
                    </div>
                    <div className="input">
                        ferry:"[ ferry tag ]"
                    </div>
                    <div className="input">
                        employee:"[ employee tag ]"
                    </div>
                    <div className="input">
                        vehicle:"[ vehicle tag ]"
                    </div>
                    <div className="eg">
                        e.g >> /show terminal:"jinja_terminal_1"
                    </div>
                </div>

                <div className="command">
                    <div className="cmd">
                        /list
                    </div>
                    <div className="input">
                        tag:"[ terminals | employees | ferries | tickets | vehicles ]"
                    </div>
                    <div className="eg">
                        e.g >> /list tag:"terminals"
                    </div>
                </div>

            </div>
            <div className="workbench">
                <div className="messages" id="messageList">
                    <div className="message">
                        This is a message
                    </div>

                    <div className="message type_command">
                        This is a command
                    </div>

                    <div className="message type_error">
                        This is an error
                    </div>

                    {
                        this.props.messages.map((message) => {
                            if(message.type === "command"){
                                return(<pre key={message._id} className="message type_command">
                                    {message.content}
                                </pre>)
                            }
                            if(message.type === "error"){
                                return(<pre key={message._id} className="message type_error">
                                    {message.content}
                                </pre>)
                            }
                            return(<pre key={message._id} className="message">
                                {message.content}
                            </pre>)
                        })
                    }
                </div>
                {( this.props.run.running && (
                    <div className="loader">
                        <img src={loading} alt="loading icon" />
                    </div>
                ))}
                <div className="input">
                    <input type="text" value={this.state.cmd_str} placeholder="Enter Command" onChange={this.handleChange} onKeyUp={this.handleKeyPress}/>
                </div>
            </div>
        </div>
    );
  }
}

export default connect( state => ({ run:getCommandsRunState(state), messages:getMessages(state) }) )(App);
