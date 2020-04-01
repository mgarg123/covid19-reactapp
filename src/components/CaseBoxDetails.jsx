import React, { Component } from 'react'
import CountUp from 'react-countup'

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
                <div className="no-details-right"><CountUp
                    start={parseInt(this.props.val) - 20}
                    duration={1.8}
                    end={parseInt(this.props.val)} /></div>
                <div className="today-delta"
                    style={{
                        color: `${this.props.isDark ? 'rgb(125, 221, 189)' : 'rgb(34, 143, 106)'}`
                    }}
                >{`${this.props.todayDelta !== undefined ? '+' + this.props.todayDelta + ' today' : ''}`}
                </div>
            </div>
        )
    }
}

export default CaseBoxDetails
