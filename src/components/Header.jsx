import React, { Component, Fragment } from 'react'
import Switch from 'react-switch'

export class Header extends Component {
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
                    <div id="heading"><span>nCov-India</span></div>
                    <div id="switch-theme"><span style={{ marginRight: "0px", paddingRight: "4px", fontSize: "15px" }}>Dark Mode</span>
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
