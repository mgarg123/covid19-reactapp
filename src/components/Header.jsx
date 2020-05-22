import React, { Component, Fragment, createRef } from 'react'
// import Switch from 'react-switch'
import logo from '../img/Logo.png'
import { Link } from 'react-router-dom'
import '../css/header.css'
// import sun from '../img/sun.png'
import { connect } from 'react-redux'
import { switchDarkMode } from './redux/darkModeReducer'
import { Translation } from 'react-i18next'
import styled from 'styled-components';



class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            switched: props.isDark,
            isStandalone: false,
            open: false
        }
        this.btnRef = createRef()
    }


    // transform: ${ this.state.open ? 'translateX(-100%)' : 'translateX(0%)' };



    toggleSwitch = (switched) => {
        this.setState({ switched: !this.state.switched })
        localStorage.setItem('ncovindia_isDark', '' + switched)

    }
    componentDidMount() {
        // console.log(this.props.isDark)
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
            this.props.switchDarkMode(!prevState.switched)
            // console.log(this.props.isDark)
            // this.props.isDarkCallBack(this.state.switched)
        }
    }

    render() {

        let StyledBurger = styled.button`
  
  top: 3%;
  right: 2rem;
  outline:0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  span {
    width: 2rem;
    height: 0.25rem;
    background: #fff;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${this.state.open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    :nth-child(2) {
      opacity: ${this.state.open ? '0' : '1'};
      transform: ${this.state.open ? 'translateX(20px)' : 'translateX(0)'};
    }
    :nth-child(3) {
      transform: ${this.state.open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }`;

        let StyledMenu = styled.nav`
  flex-direction: column;
  justify-content: center;
  display:${this.state.open ? 'block' : 'none'};
  background: ${this.state.switched ? '#1c1c1c' : '#2e97d3'};
  z-index:9;
  transform:${this.state.open ? 'translateX(0%)' : 'translateX(100%)'};
  height: 100vh;
  text-align: left;
  padding: 15% 10px;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  @media (max-width: 767px) {
      width: 80%;
      padding:50% 10px;
     
    }
  a {
    font-size: 1rem;
    text-transform: uppercase;
    padding: 0px 20px;
    font-weight: bold;
    letter-spacing: 2.5px;
    display:flex;
    align-items:center;
    justify-content:end;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s linear;
    animation: slideright 0.3s ease-in-out;
    @media (max-width: 767px) {
      font-size: 1rem;
    }
    @keyframes slideright{
        0%{
            transform:translateX(50%);
            opacity:0.4;
        }
        100%{
            transform:translateX(0%);
            opacity:1;
        }
    }
    &:hover {
      color: rgb(136, 248, 224);
    }
  }
`;

        return (
            <Fragment>
                <div className="header" style={{ color: '#fff' }}>
                    <Link to="/">
                        <div id="heading"><span><img src={logo} height="42px" width="42px" alt="" /></span>
                            <span style={{ marginLeft: "5px" }}>nCov-India</span>
                        </div>
                    </Link>
                    <div id="switch-theme">

                        <div id='mobileMenu'>
                            <ul className='navbar-2'>
                                <li style={{ cursor: 'pointer' }}>
                                    <span style={{ cursor: 'pointer' }}
                                        className="material-icons"
                                        id="add-to-homescreen"
                                        ref={this.btnRef}
                                        //eslint-disable-next-line
                                        style={{ display: `${this.state.isStandalone ? 'none' : 'inline-block'}`, fontSize: '28px' }}
                                    >
                                        add_to_home_screen
                                    </span>
                                </li>
                                <li id="pc-dark-mode"
                                    onClick={() => this.setState({ switched: !this.state.switched })}
                                    style={{}}>
                                    <i className={`fa ${this.state.switched ? 'fa-sun-o' : 'fa-moon-o'}`}
                                        style={{
                                            color: `${this.state.switched ? 'yellow' : '#fff'}`,
                                            fontSize: '28px',
                                            cursor: 'pointer',
                                            transform: 'rotate(360deg)',
                                            transition: 'transform 0.3s ease-in-out'
                                            // display: `${this.state.switched ? 'none' : 'inline-block'}`
                                        }}
                                    ></i>
                                    {/* <img src={sun} style={{ display: `${this.state.switched ? 'inline-block' : 'none'}` }} alt="" /> */}

                                    {/* <span style={{ marginRight: "0px", fontSize: "15px" }}>Dark Mode</span>
                                    <Switch onChange={this.toggleSwitch}
                                        checked={this.state.switched && localStorage.getItem('ncovindia_isDark') === 'true'}
                                        className="react-switch"
                                        height={21}
                                        width={40}
                                    /> */}
                                </li>

                            </ul>
                            <StyledBurger aria-label="Toggle menu" aria-expanded={this.state.open} open={this.state.open} onClick={() => this.setState({ open: !this.state.open })}>
                                <span />
                                <span />
                                <span />
                            </StyledBurger>
                        </div>



                        {/* <Switch onChange={this.toggleSwitch}
                            checked={this.state.switched && localStorage.getItem('ncovindia_isDark') === 'true'}
                            className="react-switch"
                            height={20}
                            width={40}
                        /> */}
                    </div>
                    <StyledMenu open={this.state.open} >
                        <ul className="navbar">
                            <li style={{
                                background: `${window.location.pathname === "/" ? this.state.switched ? '#2f2f33' : 'rgb(96, 183, 232)' : ''}`,
                                borderLeft: `${window.location.pathname === "/" && '0.05px solid red'}`
                            }}>
                                <Link to="/"><span
                                    // style={{ color: `${this.state.switched ? '#4cd2b9' : 'rgb(236, 181, 57)'}` }}
                                    className="material-icons navbar-icons">
                                    home</span>
                                    <span>
                                        <Translation>
                                            {t => t("Home")}
                                        </Translation>
                                    </span>
                                </Link></li>
                            <li style={{
                                background: `${window.location.pathname === "/about-corona" ? this.state.switched ? '#2f2f33' : 'rgb(96, 183, 232)' : ''}`,
                                borderLeft: `${window.location.pathname === "/about-corona" && '0.05px solid red'}`
                            }}>
                                <Link to="/about-corona"><span
                                    // style={{ color: `${this.state.switched ? '#4cd2b9' : 'rgb(236, 181, 57)'}` }}
                                    className="material-icons navbar-icons">
                                    info
                            </span>
                                    <span>
                                        <Translation>
                                            {t => t("About Corona")}
                                        </Translation>
                                    </span>
                                </Link></li>
                            <li style={{
                                background: `${window.location.pathname === "/corona-patients-in-world" ? this.state.switched ? '#2f2f33' : 'rgb(96, 183, 232)' : ''}`,
                                borderLeft: `${window.location.pathname === "/corona-patients-in-world" && '0.05px solid red'}`
                            }}>
                                <Link to="/corona-patients-in-world"><span
                                    // style={{ color: `${this.state.switched ? '#4cd2b9' : 'rgb(236, 181, 57)'}` }}
                                    className="material-icons navbar-icons">
                                    language
                            </span><span>
                                        <Translation>
                                            {t => t("World Data")}
                                        </Translation>
                                    </span>
                                </Link>
                            </li>
                            <li style={{
                                background: `${window.location.pathname === "/compare-corona-records-of-different-countries" ?
                                    this.state.switched ? '#2f2f33' : 'rgb(96, 183, 232)' : ''}`,
                                borderLeft: `${window.location.pathname === "/compare-corona-records-of-different-countries" && '0.05px solid red'}`
                            }}>
                                <Link to="/compare-corona-records-of-different-countries"><span
                                    // style={{ color: `${this.state.switched ? '#4cd2b9' : 'rgb(236, 181, 57)'}` }}
                                    className="material-icons navbar-icons">
                                    compare
                            </span><span>
                                        <Translation>
                                            {t => t("Compare Data")}
                                        </Translation>
                                    </span>
                                </Link>
                            </li>
                            <li style={{
                                background: `${window.location.pathname === "/donate" ? this.state.switched ? '#2f2f33' : 'rgb(96, 183, 232)' : ''}`,
                                borderLeft: `${window.location.pathname === "/donate" && '0.05px solid red'}`
                            }}> <Link to="/donate"><span
                                // style={{ color: `${this.state.switched ? '#4cd2b9' : 'rgb(236, 181, 57)'}` }}
                                className="material-icons navbar-icons">
                                account_balance_wallet
                            </span><span>
                                        <Translation>
                                            {t => t("Donate")}
                                        </Translation>
                                    </span> </Link>
                            </li>
                            {/* <li> <a href={"https://api.ncovindias.xyz"}><span class="material-icons navbar-icons">
                                code
</span><span>
                                    <Translation>
                                        {t => t("API")}
                                    </Translation>
                                </span> </a>
                            </li> */}
                            {/* <li id="mob-dark-mode" style={{
                                padding: `6px ${this.state.switched ? '23px' : '20px'}`
                            }}>
                                <i className={`fa ${this.state.switched ? 'fa-moon-o' : 'fa-sun-o'}`}></i>
                                <span style={{
                                    marginRight: "0px", paddingRight: "4px",
                                    color: '#fff',
                                    fontSize: "15px"
                                }}>Dark Mode</span>
                                <Switch onChange={this.toggleSwitch}
                                    checked={this.state.switched && localStorage.getItem('ncovindia_isDark') === 'true'}
                                    className="react-switch"
                                    height={21}
                                    width={40}
                                />

                            </li> */}

                        </ul>
                    </StyledMenu>

                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        isDark: state.theme.isDark
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchDarkMode: mode => dispatch(switchDarkMode(mode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
