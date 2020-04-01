import React, { Component } from 'react'
import '../css/plot.css'
import AgeGroupChart from './AgeGroupChart'
import DailyTrends from './DailyTrends'
import axios from 'axios'
import DeathVsRecovered from './DeathVsRecovered'

export class Graphs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labels: [],
            deaths: [],
            recovered: []
        }
    }
    componentDidMount() {

        // const container = this.chartRef.current.container.current;
        // container.style.height = "100%"
        // container.style.width = "100%"
        // this.chartRef.current.chart.reflow()

        //Api Call for Graph
        let url = "https://api.covid19india.org/data.json"
        axios.get(url).then(response => {
            let data = response.data

            //It's important to use Numeric Values dataset in order to plot the graph else the graph will be blank
            let labels = data.cases_time_series.map(x => (x.dailyrecovered !== "0" || x.dailydeceased !== "0") && x.date).filter(x => x !== false)
            let deaths = data.cases_time_series.map(x => x.dailydeceased !== "0" && parseInt(x.dailydeceased)).filter(x => x !== false)
            let recover = data.cases_time_series.map(x => x.dailyrecovered !== "0" && parseInt(x.dailyrecovered)).filter(x => x !== false)

            this.setState({
                labels: labels,
                deaths: deaths,
                recovered: recover
            })


        }).catch(error => console.log(error.message))

    }

    render() {
        return (
            <div className="graphs-main-cont">
                {/* <DailyTrendGraph isDark={this.props.isDark} /> */}
                <DailyTrends isDark={this.props.isDark} />
                <AgeGroupChart isDark={this.props.isDark} />
                <DeathVsRecovered isDark={this.props.isDark} deaths={this.state.deaths} labels={this.state.labels} recover={this.state.recovered} />
            </div>
        )
    }
}

export default Graphs
