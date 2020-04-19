import React, { Component, Fragment, createRef } from 'react'
import Switch from 'react-switch'
import logo from '../img/Logo.png'
import { Link } from 'react-router-dom'
import '../css/header.css'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            switched: true,
            isStandalone: false
        }
        this.btnRef = createRef()
    }
    toggleSwitch = (switched) => {
        this.setState({ switched: !this.state.switched })
        localStorage.setItem('ncovindia_isDark', '' + switched)

    }
    componentDidMount() {
        let btn = document.getElementById("add-to-homescreen")
        window.addEventListener('beforeinstallprompt', (event) => {
            btn.addEventListener('click', () => {
                event.prompt()
                event.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        btn.style.display = 'none'
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    event = null;
                });
            });
        });

        //Check if A2HS is Installed and show hide icon accordingly from the app
        if (window.matchMedia('(display-mode:standalone)').matches || window.navigator.standalone === true) {
            this.setState({ isStandalone: true })
        } else {
            this.setState({ isStandalone: false })
        }

        //Check if A2HS is installed
        window.addEventListener('appinstalled', () => {
            this.setState({ isStandalone: true })
        })

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
                            <Link to="/donate"><li>Donate</li></Link>
                        </ul>
                        <ul className='navbar-2'>
                            <li>
                                <span style={{ paddingRight: '8px', cursor: 'pointer' }}
                                    className="material-icons"
                                    id="add-to-homescreen"
                                    ref={this.btnRef}
                                    //eslint-disable-next-line
                                    style={{ display: `${this.state.isStandalone ? 'none' : 'inline-block'}` }}
                                >
                                    add_to_home_screen
                                    </span>
                            </li>
                            <li><span style={{ marginRight: "0px", paddingRight: "4px", paddingBottom: '15px', fontSize: "15px" }}>Dark Mode</span></li>
                            <li>
                                <Switch onChange={this.toggleSwitch}
                                    checked={this.state.switched && localStorage.getItem('ncovindia_isDark') === 'true'}
                                    className="react-switch"
                                    height={21}
                                    width={40}
                                />
                            </li>
                        </ul>


                        {/* <Switch onChange={this.toggleSwitch}
                            checked={this.state.switched && localStorage.getItem('ncovindia_isDark') === 'true'}
                            className="react-switch"
                            height={20}
                            width={40}
                        /> */}
                    </div>
                </div>
            </Fragment >
        )
    }
}

export default Header
