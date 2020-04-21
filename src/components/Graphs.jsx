import React, { Component } from 'react'
import '../css/plot.css'
import AgeGroupChart from './AgeGroupChart'
import DailyTrends from './DailyTrends'
import axios from 'axios'
import DeathVsRecovered from './DeathVsRecovered'
import StateCaseChart from './StateCaseChart'

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
            let data = response.data.cases_time_series
            let filteredData = data.filter(x => (x.dailydeceased !== '0' || x.dailyrecovered !== '0'))
            //It's important to use Numeric Values dataset in order to plot the graph else the graph will be blank
            let labels = filteredData.map(x => x.date)
            let deaths = filteredData.map(x => parseInt(x.dailydeceased))
            let recover = filteredData.map(x => parseInt(x.dailyrecovered))

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
                <div className="graphs-holder">
                    <DailyTrends isDark={this.props.isDark} />
                    <AgeGroupChart isDark={this.props.isDark} />
                    <DeathVsRecovered isDark={this.props.isDark} deaths={this.state.deaths} labels={this.state.labels} recover={this.state.recovered} />
                    <StateCaseChart />
                </div>

            </div>
        )
    }
}

export default Graphs
