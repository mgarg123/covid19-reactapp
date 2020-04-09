import React, { Component } from 'react'
import '../css/header.css'
import newFeature from '../img/new.svg'
export class HeaderTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isStatsClicked: true,
            isStatewiseClicked: false,
            isGraphsClicked: false,
            isPredictionClicked: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isStatsClicked !== prevState.isStatsClicked ||
            this.state.isStatewiseClicked !== prevState.isStatewiseClicked ||
            this.state.isGraphsClicked !== prevState.isGraphsClicked ||
            this.state.isPredictionClicked !== prevState.isPredictionClicked) {
            this.props.tabClickedCallBack(this.state.isStatsClicked,
                this.state.isStatewiseClicked,
                this.state.isGraphsClicked,
                this.state.isPredictionClicked)
        }
    }

    render() {
        return (
            <div className="tabs-container" style={{ color: "#fff" }}>
                <div className="tabs"
                    style={{ background: `${this.state.isStatsClicked ? "rgb(50, 58, 70)" : ""}` }}
                    onClick={() => this.setState({
                        isStatsClicked: true,
                        isStatewiseClicked: false,
                        isGraphsClicked: false,
                        isPredictionClicked: false
                    })}>
                    <span>{this.props.tabs[0]}</span>
                </div>
                <div className="tabs"
                    style={{
                        background: `${this.state.isStatewiseClicked ? "rgb(50, 58, 70)" : ""}`,
                        display: `${this.props.tabs[1] !== undefined ? 'flex' : 'none'}`
                    }}
                    onClick={() => this.setState({
                        isStatsClicked: false,
                        isStatewiseClicked: true,
                        isGraphsClicked: false,
                        isPredictionClicked: false
                    })}>
                    <span>{this.props.tabs[1] !== undefined && this.props.tabs[1]}</span>
                </div>
                <div className="tabs"
                    style={{
                        background: `${this.state.isGraphsClicked ? "rgb(50, 58, 70)" : ""}`,
                        display: `${this.props.tabs[2] !== undefined ? 'flex' : 'none'}`
                    }}
                    onClick={() => this.setState({
                        isStatsClicked: false,
                        isStatewiseClicked: false,
                        isGraphsClicked: true,
                        isPredictionClicked: false
                    })}>
                    <span>{this.props.tabs[2] !== undefined && this.props.tabs[2]}</span>
                </div>
                <div className="tabs"
                    style={{
                        background: `${this.state.isPredictionClicked ? "rgb(50, 58, 70)" : ""}`,
                        display: `${this.props.tabs[3] !== undefined ? 'flex' : 'none'}`
                    }}
                    onClick={() => this.setState({
                        isStatsClicked: false,
                        isStatewiseClicked: false,
                        isGraphsClicked: false,
                        isPredictionClicked: true
                    })}>
                    <img src={newFeature} alt=""
                        style={{
                            width: `${window.screen.width < 600 ? '24px' : '42px'}`,
                            height: `${window.screen.width < 600 ? '24px' : '42px'}`,
                            position: 'absolute',
                            right: '0px',
                            top: '0'
                        }}
                    />
                    <span>{this.props.tabs[3] !== undefined && this.props.tabs[3]}</span>
                </div>
            </div>
        )
    }
}

export default HeaderTab
