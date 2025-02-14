import React, { Component } from 'react'
import CountUp from 'react-countup'
import { Translation } from 'react-i18next'

export class CaseBoxDetails extends Component {
    render() {
        return (
            <div className="more-details">
                <div className="no-details-left">
                    <div
                        id="rate-percent"
                        style={{ backgroundColor: `${this.props.bgColor}`, color: '#fff' }}
                    >
                        <span className="material-icons" style={{ fontSize: 10 }}>
                            trending_up</span>
                        {this.props.title !== "Infected" && ((parseInt(this.props.val) / parseInt(this.props.conf)) * 100).toPrecision(3) + "%"}
                    </div>
                </div>
                <div className="no-details-right">
                    <CountUp
                        start={parseInt(this.props.val) - 26}
                        duration={1.8}
                        end={parseInt(this.props.val)}
                        formattingFn={(n) => n.toLocaleString('en-IN')}
                    />
                </div>
                <div className="today-delta"
                    style={{
                        color: `${this.props.isDark ? 'rgb(125, 221, 189)' : 'rgb(34, 143, 106)'}`
                    }}
                >
                    <Translation>
                        {t => `${this.props.todayDelta !== undefined ? '+' +
                            parseInt(this.props.todayDelta).toLocaleString('en-IN') + ' ' + t("today") : ''}`}

                    </Translation>
                </div>
            </div>
        )
    }
}

export default CaseBoxDetails
