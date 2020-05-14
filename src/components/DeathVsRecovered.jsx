import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import { Translation } from 'react-i18next'

export class DeathVsRecovered extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleDeath: false,
            toggleRecovered: false
        }
    }




    render() {
        return (
            <div className="death-rec-container" style={{
                marginBottom: `${this.props.margin ? this.props.margin : '0px'}`,
                width: `${this.props.width !== undefined ? window.screen.width > 767 ? '100%' : this.props.width : window.screen.width > 767 ? '50%' : '100%'}`
            }}>
                <div id="death-rec-title" style={{
                    textAlign: "center",
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                    fontSize: '20px',
                    fontWeight: 'bold',

                }}>
                    <span >
                        <Translation>
                            {t => this.props.country !== undefined ? t(this.props.country) : t('Daily Deaths Vs Recovered')}
                        </Translation>
                    </span>
                </div>
                <div className="death-vs-rec" style={{ backgroundColor: `${this.props.isDark ? '#262529' : '#fff'}` }}>
                    <div className="buttons" style={{ marginTop: '10px' }}>
                        <button onClick={() => this.setState({ toggleRecovered: !this.state.toggleRecovered })} id="week">Toggle Recovered</button>
                        <button onClick={() => this.setState({ toggleDeath: !this.state.toggleDeath })} id="month">Toggle Death</button>
                    </div>
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
                                backgroundColor: `#eee`,
                                enabled: false
                            },

                            series: [{
                                title: 'Deaths',
                                name: 'Recovered',
                                type: 'spline',
                                yAxis: 1,
                                data: this.state.toggleRecovered ? [] : this.props.recover,
                                color: `${this.props.isDark ? '#56d611' : 'green'}`,

                            }, {
                                type: 'spline',
                                name: 'Deaths',
                                data: this.state.toggleDeath ? [] : this.props.deaths,
                                color: `${this.props.isDark ? '#d61111' : 'red'}`,

                            }]
                        }}
                        oneToOne={true}
                        redraw={true}
                        allowChartUpdate={true}
                        updateArgs={[true]}
                    />
                </div>

            </div >
        )
    }
}

export default DeathVsRecovered
