import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

export class CompareTrendsMerged extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleColumn: false,
            labels: props.labels,
            confirmed1: props.data1,
            confirmed2: props.data2,
            confirmed3: props.data3,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.data1 !== prevProps.data1 || this.props.data2 !== prevProps.data2 || this.props.data3 !== prevProps.data3) {
            this.setState({
                confirmed1: this.props.data1,
                confirmed2: this.props.data2,
                confirmed3: this.props.data3,
                labels: this.props.labels
            })
        }
    }

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
                }}>{
                        this.props.graphType === "Spread Trend" ? 'Spread Trends' :
                            this.props.graphType === "Death Trend" ? 'Death Trends' : 'Recovery Trends'
                    }</span>
                <div className="daily-trends">
                    {/* <div className="buttons-left" style={{ border: '1px solid red' }}>
                        
                    </div> */}
                    <div className="buttons" style={{ marginTop: '10px' }}>
                        <button onClick={() => this.setState({ toggleColumn: !this.state.toggleColumn })} id="toggle-line"
                            style={{ float: 'left', marginLeft: '2px' }}>Toggle Column
                        </button>
                        <button onClick={this.loadWeekData} id="week" style={{ visibility: 'hidden' }}>Week</button>
                        <button onClick={this.loadMonthData} id="month" style={{ visibility: 'hidden' }}>>Month</button>
                    </div>
                    <HighchartsReact
                        // ref={this.chartRef}
                        highcharts={Highcharts}
                        options={
                            {
                                chart: {
                                    type: `${this.state.toggleColumn ? 'spline' : 'column'}`,
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
                                    crosshair: true
                                },
                                legend: {
                                    itemStyle: {
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }
                                },
                                yAxis: {
                                    min: 0,
                                    labels: {
                                        style: {
                                            color: 'red'
                                        }
                                    },
                                    title: {
                                        text: `${this.props.graphType === "Spread Trend" ? 'Confirmed Cases' :
                                            this.props.graphType === "Death Trend" ? 'Death Cases' : 'Recovered Cases'}`
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                        //eslint-disable-next-line
                                        '<td style="padding:0"><b>{point.y}' + `${this.props.graphType === "Spread Trend" ?
                                            //eslint-disable-next-line
                                            ' Infected' : this.props.graphType === "Death Trend" ? ' Deaths' : ' Recovered'}` + '</b></td></tr>',
                                    footerFormat: '</table>',
                                    shared: true,
                                    useHTML: true
                                },
                                plotOptions: {
                                    column: {
                                        pointPadding: 0.2,
                                        borderWidth: 0
                                    }
                                },
                                series: [
                                    {
                                        name: this.props.country1,
                                        data: this.state.confirmed1,
                                        color: `${this.props.isDark ? '#3498DB' : 'blue'}`

                                    }, {
                                        name: this.props.country2,
                                        data: this.state.confirmed2,
                                        color: `${this.props.isDark ? 'hotpink' : 'deeppink'}`

                                    }, {
                                        name: this.props.country3,
                                        data: this.state.confirmed3,
                                        color: `${this.props.isDark ? '#26ae60' : 'green'}`

                                    }]
                            }
                        }
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

export default CompareTrendsMerged
