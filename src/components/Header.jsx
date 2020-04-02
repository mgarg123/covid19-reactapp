import React, { Component, Fragment } from 'react'
import Switch from 'react-switch'
import logo from '../img/Logo.png'
import { Link } from 'react-router-dom'
import '../css/header.css'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            switched: true
        }
    }
    toggleSwitch = () => {
        this.setState(prevState => {
            return {
                switched: !prevState.switched
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.switched !== this.state.switched) {
            this.props.isDarkCallBack(this.state.switched)
        }
    }

    render() {
        return (
            <Fragment>
                <div className="header" style={{ color: '#fff' }}>
                    <div id="heading"><span><img src={logo} height="42px" width="42px" alt="" /></span>
                        <span style={{ marginLeft: "5px" }}>nCov-India</span>
                    </div>
                    <div id="switch-theme">
                        <ul class="navbar">
                            <li>Home</li>
                            <Link to="/about-corona"><li>About Corona</li></Link>
                        </ul>
                        <span style={{ marginRight: "0px", paddingRight: "4px", fontSize: "15px" }}>Dark Mode</span>
                        <Switch onChange={this.toggleSwitch}
                            checked={this.state.switched}
                            className="react-switch"
                            height={20}
                            width={40}
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Header
