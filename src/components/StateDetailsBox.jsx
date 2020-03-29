import React, { Component } from 'react'

export class StateDetailsBox extends Component {
    render() {
        return (
            <div
                className="state-det-1"
                style={{ color: `${this.props.color}`, background: `${[this.props.isDark ? "#323A46" : "#fff"]}` }}>
                <div className="status-name">{this.props.title}</div>
                <div className="status-val" style={{ color: `${this.props.isDark ? "#fff" : "#2d2d2d"}` }}>{this.props.val}</div>
            </div>
        )
    }
}

export default StateDetailsBox
