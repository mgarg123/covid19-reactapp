import React, { Component, createRef } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import axios from 'axios'

class DailyTrends extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labels: ["30 January ", "31 January ", "01 February ", "02 February ", "03 February ", "04 February ", "05 February ", "06 February ", "07 February ", "08 February ", "09 February ", "10 February ", "11 February ", "12 February ", "13 February ", "14 February ", "15 February ", "16 February ", "17 February ", "18 February ", "19 February ", "20 February ", "21 February ", "22 February ", "23 February ", "24 February ", "25 February ", "26 February ", "27 February ", "28 February ", "29 February ", "01 March ", "02 March ", "03 March ", "04 March ", "05 March ", "06 March ", "07 March ", "08 March ", "09 March ", "10 March ", "11 March ", "12 March ", "13 March ", "14 March ", "15 March ", "16 March ", "17 March ", "18 March ", "19 March ", "20 March ", "21 March ", "22 March ", "23 March ", "24 March ", "25 March ", "26 March ", "27 March ", "28 March ", "29 March "],
            confirmeds: ["1", "0", "0", "1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "1", "22", "2", "1", "3", "5", "9", "15", "7", "12", "9", "16", "6", "14", "19", "25", "28", "59", "76", "69", "102", "66", "86", "78", "151", "143", "110"]
        }
        // this.chartRef = createRef()
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
            let labels = data.cases_time_series.map(x => x.dailyconfirmed !== "0" && x.date).filter(x => x !== false)
            let confirmeds = data.cases_time_series.map(x => x.dailyconfirmed !== "0" && parseInt(x.dailyconfirmed)).filter(x => x !== false)
            // let labels = data.cases_time_series.map(x => x.date)
            // let confirmeds = data.cases_time_series.map(x => parseInt(x.dailyconfirmed))     

            this.setState({
                labels: labels,
                confirmeds: confirmeds
            })


        }).catch(error => console.log(error.message))

    }

    render() {
        console.log(this.state.labels);
        console.log(this.state.confirmeds);
        return (
            <div className="daily-trend-container">
                <span style={{
                    textAlign: 'center',
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                    paddingTop: '10px',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>Daily Spread Trends</span>
                <div className="daily-trends">
                    <HighchartsReact
                        // ref={this.chartRef}
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                zoomType: 'xy',
                                backgroundColor: `${this.props.isDark ? 'transparent' : '#fff'}`,
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: '',
                                style: {
                                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                                    fontWeight: 'bold',
                                    fontSize: '20px'
                                }
                            },
                            xAxis: [{
                                // type: 'datetime',
                                categories: this.state.labels,
                                crosshair: true,
                                labels: {
                                    style: {
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                }
                            }],
                            yAxis: [{ // Primary yAxis
                                labels: {
                                    style: {
                                        color: 'red'
                                    }
                                },
                                title: {
                                    text: 'Confirmed Cases',
                                    style: {
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                }
                            }, { // Secondary yAxis
                                title: {
                                    text: 'Confirmed Cases',
                                    style: {
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                },
                                labels: {
                                    style: {
                                        color: 'red'
                                    }
                                },
                                opposite: true
                            }],
                            tooltip: {
                                shared: true
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'left',
                                x: 80,
                                verticalAlign: 'top',
                                y: 20,
                                floating: true,
                                backgroundColor: `#eee`
                            },

                            series: [{
                                title: 'Confirmed Cases',
                                type: 'column',
                                yAxis: 1,
                                data: this.state.confirmeds,
                                color: `${this.props.isDark ? '#fff' : 'skyblue'}`,
                                tooltip: {
                                    valueSuffix: ' infected'
                                }

                            }, {
                                type: 'spline',
                                data: this.state.confirmeds,
                                color: `${this.props.isDark ? '#10fbe5' : 'violet'}`,
                                tooltip: {
                                    valueSuffix: ' infected'
                                }
                            }]
                        }}
                        oneToOne={true}
                        redraw={true}
                        allowChartUpdate={true}
                        updateArgs={[true]}
                    />
                </div>
            </div>
        )
    }
}

export default DailyTrends
