import React, { Component } from 'react'
import '../css/header.css'
import newFeature from '../img/new.svg'
import ReactGA from 'react-ga'
import { Translation } from 'react-i18next'
// import { Link } from 'react-router-dom'

export class HeaderTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isStatsClicked: false,
            isStatewiseClicked: false,
            isGraphsClicked: false,
            isPredictionClicked: false
        }
    }
    // UNSAFE_componentWillReceiveProps(props) {
    //     this.state = {
    //         isStatsClicked: props.statsSwiped,
    //         isStatewiseClicked: props.statewiseSwiped,
    //         isGraphsClicked: props.graphsSwiped,
    //         isPredictionClicked: props.statsSwiped === false && props.statewiseSwiped === false && props.graphsSwiped === false ? true : false
    //     }
    // }
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
        if (this.state.isStatsClicked !== prevState.isStatsClicked) {
            ReactGA.ga('send', 'event', 'India Statistics', 'Stats', 'Stats tab clicked')
        }
        if (this.state.isStatewiseClicked !== prevState.isStatewiseClicked) {
            ReactGA.ga('send', 'event', 'India Statistics', 'Lists', 'Lists tab clicked')
        }
        if (this.state.isGraphsClicked !== prevState.isGraphsClicked) {
            ReactGA.ga('send', 'event', 'India Statistics', 'Graphs', 'Graphs tab clicked')
        }
        if (this.state.isPredictionClicked !== prevState.isPredictionClicked) {
            ReactGA.ga('send', 'event', 'India Statistics', 'Predictions', 'Predictions tab clicked')
        }



    }

    render() {
        return (
            <div className="tabs-container" style={{ color: "#fff" }}>
                <div className="tabs"
                    style={{ background: `${this.state.isStatsClicked || this.props.statsSwiped ? "rgb(50, 58, 70)" : ""}` }}
                    onClick={() => this.setState({
                        isStatsClicked: true,
                        isStatewiseClicked: false,
                        isGraphsClicked: false,
                        isPredictionClicked: false
                    })}>
                    <span>
                        <Translation>
                            {t => t(this.props.tabs[0])}
                        </Translation>
                    </span>
                </div>
                <div className="tabs"
                    style={{
                        background: `${this.state.isStatewiseClicked || this.props.statewiseSwiped ? "rgb(50, 58, 70)" : ""}`,
                        display: `${this.props.tabs[1] !== undefined ? 'flex' : 'none'}`
                    }}
                    onClick={() => this.setState({
                        isStatsClicked: false,
                        isStatewiseClicked: true,
                        isGraphsClicked: false,
                        isPredictionClicked: false
                    })}>
                    <span>{this.props.tabs[1] !== undefined &&
                        <Translation>
                            {t => t(this.props.tabs[1])}
                        </Translation>
                    }</span>
                </div>
                <div className="tabs"
                    style={{
                        background: `${this.state.isGraphsClicked || this.props.graphsSwiped ? "rgb(50, 58, 70)" : ""}`,
                        display: `${this.props.tabs[2] !== undefined ? 'flex' : 'none'}`
                    }}
                    onClick={() => this.setState({
                        isStatsClicked: false,
                        isStatewiseClicked: false,
                        isGraphsClicked: true,
                        isPredictionClicked: false
                    })}>
                    <span>{this.props.tabs[2] !== undefined &&
                        <Translation>
                            {t => t(this.props.tabs[2])}
                        </Translation>
                    }</span>
                </div>
                <div className="tabs"
                    style={{
                        background: `${this.state.isPredictionClicked || (this.props.graphsSwiped === false &&
                            this.props.statsSwiped === false && this.props.statewiseSwiped === false
                        ) ? "rgb(50, 58, 70)" : ""}`,
                        display: `${this.props.tabs[3] !== undefined ? 'flex' : 'none'}`,
                        position: 'relative'
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
                    <span>{this.props.tabs[3] !== undefined &&
                        <Translation>
                            {t => t(this.props.tabs[3])}
                        </Translation>
                    }</span>
                </div>
            </div>
        )
    }
}

export default HeaderTab
