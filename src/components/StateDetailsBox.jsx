import React, { Component } from 'react'
import { Translation } from 'react-i18next'

export class StateDetailsBox extends Component {
    render() {
        return (
            <div
                className="state-det-1"
                style={{ background: `${this.props.isDark ? "#252629" : "#fff"}` }}>
                <div className="status-name" style={{ color: `${this.props.color}` }}>
                    <Translation>
                        {t => t(this.props.title)}
                    </Translation>
                </div>
                <div className="status-val" style={{ color: `${this.props.isDark ? "#fff" : "#2d2d2d"}` }}>{parseInt(this.props.val).toLocaleString('en-In')}</div>
                <div className="status-counter"
                    style={{ color: `${this.props.isDark ? '#7dddbd' : 'rgb(42, 181, 135)'}`, fontSize: '10px', fontWeight: 'normal' }}>
                    <Translation>
                        {t => this.props.casesCounter !== undefined && "+" + parseInt(this.props.casesCounter).toLocaleString('en-In') + " " + t("today")}
                    </Translation>

                </div>
            </div>
        )
    }
}

export default StateDetailsBox
