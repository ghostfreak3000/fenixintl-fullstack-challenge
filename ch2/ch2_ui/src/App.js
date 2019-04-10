import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';


import store from './redux/store';
import './App.css';
import Workbench from "./workbench";
import Signup from "./signup/index";
import Login from "./login/index";


class App extends Component {
    constructor(props){
        super(props);
        this["module_name"] = "workbench_module";
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <React.Fragment>
                        <Route exact path="/" component={Workbench} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                    </React.Fragment>
                </Router>
            </Provider>
        );
    }
}

export default App;
