import React, { Component } from 'react';
import Header from  "../header";
import TasksViewMany from "../tasks/view/many"

class Workbench extends Component {
    constructor(props){
        super(props);
        this["module_name"] = "workbench_module";
    }
    render() {
        return (
            <div id={this.module_name}>
                <Header/>
                <TasksViewMany/>
            </div>
        );
    }
}

export default Workbench;
