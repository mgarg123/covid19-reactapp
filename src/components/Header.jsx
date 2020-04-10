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
    toggleSwitch = (switched) => {
        this.setState({ switched: !this.state.switched })
        localStorage.setItem('ncovindia_isDark', '' + switched)

    }
    componentDidMount() {


    }



    componentDidUpdate(prevProps, prevState) {
        if (prevState.switched !== this.state.switched) {
            localStorage.setItem('ncovindia_isDark', '' + this.state.switched)      //To synchronize the theme between the pages
            // alert(localStorage.getItem('ncovindia_isDark'))
            this.props.isDarkCallBack(this.state.switched)
        }
    }

    render() {
        return (
            <Fragment>
                <div className="header" style={{ color: '#fff' }}>
                    <Link to="/">
                        <div id="heading"><span><img src={logo} height="42px" width="42px" alt="" /></span>
                            <span style={{ marginLeft: "5px" }}>nCov-India</span>
                        </div>
                    </Link>
                    <div id="switch-theme">
                        <ul className="navbar">
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/about-corona"><li>About Corona</li></Link>
                            <Link to="/corona-patients-in-world"><li>World Data</li></Link>
                        </ul>
                        <span style={{ marginRight: "0px", paddingRight: "4px", fontSize: "15px" }}>Dark Mode</span>
                        <Switch onChange={this.toggleSwitch}
                            checked={this.state.switched && localStorage.getItem('ncovindia_isDark') === 'true'}
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
