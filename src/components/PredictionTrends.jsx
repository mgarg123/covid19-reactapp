import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

export class PredictionTrends extends Component {
    constructor(props) {
        super(props)

        this.state = {
            weekLabel: ['2 April - 8 April', '9 April - 15 April', '16 April - 22 April', '23 April - 29 April', '30 April - 06 May', '07 May - 13 May', '14 May - 20 May', '21 May - 27 May'],
            weekConfirmedCases: [3762, 8452, 6783, 10512, 14623, 12356, 9981, 6349],
            monthLabel: ['April', 'May'],
            monthConfirmedCases: [29499, 43309],
            isWeek: true,
            toggledColumn: false
        }
    }


    render() {
        return (
            <div>
                <div className="daily-trend-container" style={{ width: '100%', margin: '0 auto' }}>
                    <span style={{
                        textAlign: 'center',
                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                        marginTop: '20px',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}>Predicted Spread Trends</span>
                    <div className="daily-trends" style={{ width: '50%' }}>
                        {/* <div className="buttons-left" style={{ border: '1px solid red' }}>
                        
                    </div> */}
                        <div className="buttons" style={{ marginTop: '10px' }}>
                            <button onClick={() => { this.setState({ toggledColumn: !this.state.toggledColumn }) }} id="toggle-line"
                                style={{ float: 'left', marginLeft: '2px' }}>Toggle Column
                        </button>
                            <button onClick={() => { this.setState({ isWeek: true }) }} id="week">Week</button>
                            <button onClick={() => { this.setState({ isWeek: false }) }} id="month">Month</button>
                        </div>
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
                                    categories: this.state.isWeek ? this.state.weekLabel : this.state.monthLabel,
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
                                    type: `${this.state.toggledColumn ? 'spline' : 'column'}`,
                                    yAxis: 1,
                                    data: this.state.isWeek ? this.state.weekConfirmedCases : this.state.monthConfirmedCases,
                                    color: `${this.props.isDark ? '#fff' : 'skyblue'}`,
                                    tooltip: {
                                        valueSuffix: ' Infected'
                                    },
                                }, {
                                    type: 'spline',
                                    name: 'Infected',
                                    data: this.state.isWeek ? this.state.weekConfirmedCases : this.state.monthConfirmedCases,
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
            </div>
        )
    }
}

export default PredictionTrends
