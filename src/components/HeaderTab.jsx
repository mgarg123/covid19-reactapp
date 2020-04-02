import React, { Component } from 'react'
import '../css/header.css'
export class HeaderTab extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isStatsClicked: true,
            isStatewiseClicked: false,
            isGraphsClicked: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isStatsClicked !== prevState.isStatsClicked ||
            this.state.isStatewiseClicked !== prevState.isStatewiseClicked ||
            this.state.isGraphsClicked !== prevState.isGraphsClicked) {
            this.props.tabClickedCallBack(this.state.isStatsClicked, this.state.isStatewiseClicked, this.state.isGraphsClicked)
        }
    }

    render() {
        return (
            <div className="tabs-container" style={{ color: "#fff" }}>
                <div className="tabs"
                    style={{ background: `${this.state.isStatsClicked ? "rgb(50, 58, 70)" : ""}` }}
                    onClick={() => this.setState({ isStatsClicked: true, isStatewiseClicked: false, isGraphsClicked: false })}>
                    <span>{this.props.tabs[0]}</span>
                </div>
                <div className="tabs"
                    style={{ background: `${this.state.isStatewiseClicked ? "rgb(50, 58, 70)" : ""}` }}
                    onClick={() => this.setState({ isStatsClicked: false, isStatewiseClicked: true, isGraphsClicked: false })}>
                    <span>{this.props.tabs[1]}</span>
                </div>
                <div className="tabs"
                    style={{ background: `${this.state.isGraphsClicked ? "rgb(50, 58, 70)" : ""}` }}
                    onClick={() => this.setState({ isStatsClicked: false, isStatewiseClicked: false, isGraphsClicked: true })}>
                    <span>{this.props.tabs[2]}</span>
                </div>
            </div>
        )
    }
}

export default HeaderTab
