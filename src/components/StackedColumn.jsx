import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

export class StackedColumn extends Component {
    render() {
        return (
            <div className="daily-trend-container" style={{
                width: `${window.screen.width < 768 ? '99%' : '94%'}`
            }}>
                <span style={{
                    textAlign: 'center',
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                    paddingTop: '-8px',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>Death Vs Recovery</span>
                <div className="daily-trends">
                    {/* <div className="buttons-left" style={{ border: '1px solid red' }}>
                        
                    </div> */}
                    <HighchartsReact
                        // ref={this.chartRef}
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                type: 'column',
                                backgroundColor: `${this.props.isDark ? 'transparent' : '#fff'}`
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: this.props.labels,
                                labels: {
                                    style: {
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                },
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Death Vs Recovery',
                                    style: {
                                        color: `${this.props.isDark ? '#fff' : '#000'}`
                                    }

                                },
                                labels: {
                                    style: {
                                        color: 'red'
                                    }
                                },
                                stackLabels: {
                                    enabled: false,
                                    style: {
                                        fontWeight: 'bold',
                                        color: ( // theme
                                            Highcharts.defaultOptions.title.style &&
                                            Highcharts.defaultOptions.title.style.color
                                        ) || 'gray'
                                    }
                                },
                            },
                            legend: {
                                labelFormatter: function () {
                                    return this.name + ' (' + this.userOptions.stack + ')';
                                },
                                shadow: false,
                                itemStyle: {
                                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                }
                            },
                            tooltip: {
                                formatter: function () {
                                    return '<b>' + this.series.userOptions.stack + '</b><br/>' +
                                        this.series.name + ': ' + this.y.toLocaleString('en-IN') + '<br/>' +
                                        'Total: ' + this.point.stackTotal.toLocaleString('en-IN');
                                }
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                    borderColor: null,
                                    dataLabels: {
                                        enabled: false
                                    }
                                }
                            },
                            series: [
                                {
                                    name: this.props.country1,
                                    data: this.props.deaths1,
                                    stack: 'Deaths'
                                }, {
                                    name: this.props.country2,
                                    data: this.props.deaths2,
                                    stack: 'Deaths'
                                }, {
                                    name: this.props.country3,
                                    data: this.props.deaths3,
                                    stack: 'Deaths'
                                },
                                {
                                    name: this.props.country1,
                                    data: this.props.recover1,
                                    stack: 'Recovered'
                                }, {
                                    name: this.props.country2,
                                    data: this.props.recover2,
                                    stack: 'Recovered'
                                }, {
                                    name: this.props.country3,
                                    data: this.props.recover3,
                                    stack: 'Recovered'
                                }
                            ]
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

export default StackedColumn
