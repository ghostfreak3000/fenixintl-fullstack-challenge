import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'

import appStore  from "../redux/store"
import { loginFail as logout } from "../login/redux/actions"
import { getLoggedIn, getCard } from "../login/redux/selectors"


class Header extends Component {
    constructor(props){
        super(props);

        const bindList = [
            "logout"
        ];

        const propList = {
            "module_name":"header_module"
        };

        bindList.map((toBind) => this[toBind] = this[toBind]["bind"](this));
        Object.keys(propList).map((prop) => this[prop] = propList[prop]);
    }

    logout(){
        appStore.dispatch(logout({}))
    }

    render() {
        return (
            <div id={this.module_name}>
                <div className="left"></div>
                <div className="middle">
                    Tasker
                </div>
                <div className="right">
                    {!this.props.isLoggedIn &&
                        <React.Fragment>
                            <Link to={`/signup`} >
                                <div className="signup">Signup</div>
                            </Link>

                            <Link to={`/login`} >
                                <div className="login">Login</div>
                            </Link>
                        </React.Fragment>
                    }
                    {this.props.isLoggedIn &&
                        <div className="logout" onClick={this.logout}>Logout ( {this.props.card.username} )</div>
                    }

                </div>
            </div>
        );
    }
}

export default connect(
    state => ({ isLoggedIn:getLoggedIn(state), card:getCard(state) })
)(Header)

