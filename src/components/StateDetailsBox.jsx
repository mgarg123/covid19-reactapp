import React, { Component } from 'react'

export class StateDetailsBox extends Component {
    render() {
        return (
            <div
                className="state-det-1"
                style={{ background: `${this.props.isDark ? "#252629" : "#fff"}` }}>
                <div className="status-name" style={{ color: `${this.props.color}` }}>{this.props.title}</div>
                <div className="status-val" style={{ color: `${this.props.isDark ? "#fff" : "#2d2d2d"}` }}>{this.props.val}</div>
                <div className="status-counter"
                    style={{ color: `${this.props.isDark ? '#7dddbd' : 'rgb(42, 181, 135)'}`, fontSize: '10px', fontWeight: 'normal' }}>
                    {this.props.casesCounter !== undefined && "+" + this.props.casesCounter + " today"}
                </div>
            </div>
        )
    }
}

export default StateDetailsBox
