import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Translation } from 'react-i18next'

export class StatesDailySpreadTrends extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggledLine: true
        }
    }

    //For Toggling Column
    toggleLine = (event) => {
        this.setState((prevState, prevProps) => ({ toggledLine: !prevState.toggledLine }))
    }

    render() {
        return (
            <div className="daily-trend-container" style={{
                width: `${this.props.width !== undefined ? this.props.width :
                    window.screen.width > 767 ? '50%' : '100%'
                    }`
            }}>
                <span style={{
                    textAlign: 'center',
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                    paddingTop: '-8px',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}><Translation>
                        {t => t('Daily Spread Trends')}
                    </Translation></span>
                <div className="daily-trends" style={{ background: `${this.props.isDark ? '#262529' : '#fff'}` }}>
                    {/* <div className="buttons-left" style={{ border: '1px solid red' }}>
                        
                    </div> */}
                    <Translation>
                        {t =>
                            <div className="buttons" style={{ marginTop: '10px' }}>
                                <button onClick={this.toggleLine} id="toggle-line"
                                    style={{ float: 'left', marginLeft: '2px' }}>{t('Toggle Column')}
                                </button>

                                <button style={{ visibility: "hidden" }} onClick={this.loadDayData} id="day">{t('Day')}</button>
                                <button style={{ visibility: "hidden" }} onClick={this.loadWeekData} id="week">{t('Week')}</button>
                                <button style={{ visibility: "hidden" }} onClick={this.loadMonthData} id="month">{t('Month')}</button>

                            </div>}
                    </Translation>

                    <HighchartsReact
                        // ref={this.chartRef}
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                zoomType: 'xy',
                                backgroundColor: `${this.props.isDark ? '#262529' : '#fff'}`,
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
                                backgroundColor: `#eee`,
                                enabled: false
                            },

                            series: [{
                                title: 'Confirmed Cases',
                                name: 'Infected',
                                enableMouseTracking: this.state.toggledLine ? true : false,
                                type: `${this.state.toggledLine ? 'column' : 'spline'}`,
                                yAxis: 1,
                                data: this.props.confirmed,
                                color: `${this.props.isDark ? '#fff' : 'skyblue'}`,
                                tooltip: {
                                    valueSuffix: ' Infected'
                                },
                            }, {
                                type: 'spline',
                                enableMouseTracking: this.state.toggledLine ? false : true,
                                name: 'Infected',
                                data: this.props.confirmed,
                                color: `${this.props.isDark ? '#10fbe5' : 'violet'}`,
                                tooltip: {
                                    valueSuffix: ' Infected'
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

export default StatesDailySpreadTrends
