import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

export class DeathVsRecovered extends Component {
    render() {
        return (
            <div className="death-rec-container">
                <div className="death-vs-rec">
                    <HighchartsReact
                        // ref={this.chartRef}
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                zoomType: 'xy',
                                backgroundColor: `${this.props.isDark ? 'transparent' : '#fff'}`,
                            },
                            dateRangeGrouping: {
                                dayFormat: { month: 'numeric', day: 'numeric', year: 'numeric' },
                                weekFormat: { month: 'numeric', day: 'numeric', year: 'numeric' },
                                monthFormat: { month: 'numeric', year: 'numeric' }
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: 'Daily Deaths Vs Recovered',
                                style: {
                                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                                    fontWeight: 'bold',
                                    fontSize: '20px'
                                }
                            },
                            xAxis: [{
                                // type: 'datetime',
                                categories: this.props.labels,
                                //categories: categories,
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
                                    text: 'Deaths Vs Recovered',
                                    style: {
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                }
                            }, { // Secondary yAxis
                                title: {
                                    text: 'Deaths Vs Recovered',
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
                                title: 'Deaths Vs Recovered',
                                type: 'spline',
                                yAxis: 1,
                                data: this.props.recover,
                                color: `${this.props.isDark ? '#fff' : 'skyblue'}`,
                                tooltip: {
                                    valueSuffix: ' recovered'
                                },
                            }, {
                                type: 'spline',
                                data: this.props.deaths,
                                color: `${this.props.isDark ? '#10fbe5' : 'violet'}`,
                                tooltip: {
                                    valueSuffix: ' deaths'
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

export default DeathVsRecovered
