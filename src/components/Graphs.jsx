import React, { Component } from 'react'
import '../css/plot.css'
import AgeGroupChart from './AgeGroupChart'
import DailyTrends from './DailyTrends'
export class Graphs extends Component {
    render() {
        return (
            <div className="graphs-main-cont">
                {/* <DailyTrendGraph isDark={this.props.isDark} /> */}
                <DailyTrends isDark={this.props.isDark} />
                <AgeGroupChart isDark={this.props.isDark} />
            </div>
        )
    }
}

export default Graphs
