import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'

export class DailyTrendGraph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                labels: ['January', 'February', 'March',
                    'April', 'May'],
                datasets: [
                    {
                        label: 'Rainfall',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        let url = "https://api.covid19india.org/data.json"
        axios.get(url).then(response => {
            let data = response.data
            let labels = data.cases_time_series.map(x => x.date)
            let confirmed = data.cases_time_series.map(x => x.dailyconfirmed)

            let newData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Confirmed Cases',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgb(95, 88, 156)',
                        borderWidth: 2,
                        data: confirmed
                    }
                ]
            }

            this.setState({ data: newData })


        }).catch(error => console.log(error.message))
    }

    render() {
        return (
            <div className="daily-trend-container">
                <div className="daily-trends">
                    <Line
                        data={this.state.data}
                        options={{
                            title: {
                                display: true,
                                text: 'Daily Spread Trends',
                                fontSize: 20,
                                fontColor: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                            },
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    fontColor: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                                },

                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        fontColor: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        fontColor: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                }]
                            }

                        }}
                        width={350}
                        height={350}
                    />
                </div>
            </div>
        )
    }
}

export default DailyTrendGraph
