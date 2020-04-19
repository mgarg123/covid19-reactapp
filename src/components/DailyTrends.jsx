import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import axios from 'axios'

class DailyTrends extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labels: [],
            confirmeds: [],
            toggledLine: true
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

            this.setState({
                labels: labels,
                confirmeds: confirmeds,
                apiresponseData: data
            })


        }).catch(error => console.log(error.message))

    }

    loadDayData = (event) => {
        let data = this.state.apiresponseData;
        //It's important to use Numeric Values dataset in order to plot the graph else the graph will be blank
        let labels = data.cases_time_series.map(x => x.dailyconfirmed !== "0" && x.date).filter(x => x !== false)
        let confirmeds = data.cases_time_series.map(x => x.dailyconfirmed !== "0" && parseInt(x.dailyconfirmed)).filter(x => x !== false)
        // let labels = data.cases_time_series.map(x => x.date)
        // let confirmeds = data.cases_time_series.map(x => parseInt(x.dailyconfirmed))     

        this.setState({
            labels: labels,
            confirmeds: confirmeds
        })
    }

    loadWeekData = (event) => {
        let apiData = this.state.apiresponseData;
        var weekCount = 0;
        var weekdata = 0;
        var weeklyDataSub = [];
        var weeklyLabel = [];
        var weekLabel = '';
        //console.log('series count: '+apiData.cases_time_series.length);
        var weeklySeriesCount = apiData.cases_time_series.length;
        var weekLoopCount = 0;
        apiData.cases_time_series.map((data) => {
            //console.log(weekLoopCount);
            weekCount++;
            weekLoopCount++;
            if (weekCount === 1) {
                weekLabel = data.date;
            }

            weekdata = parseInt(weekdata) + parseInt(data.dailyconfirmed);
            if (weekCount === 7) {
                weekLabel = weekLabel + ' - ' + data.date;
                weeklyLabel.push(weekLabel);
                weeklyDataSub.push(weekdata);
                weekdata = 0;
                weekCount = 0;
                weekLabel = '';
            }

            if (weeklySeriesCount % 7 !== 0 && ((weekLoopCount + 1) === weeklySeriesCount)) {
                //console.log('asdasd');
                weekLabel = weekLabel + ' - ' + data.date;
                weeklyLabel.push(weekLabel);
                weeklyDataSub.push(weekdata);
                weekdata = 0;
                weekCount = 0;
                weekLabel = '';
            }

            return null;
        });

        this.setState({
            labels: weeklyLabel,
            confirmeds: weeklyDataSub
        });
    }

    loadMonthData = (event) => {
        let apiData = this.state.apiresponseData;

        var monthlyConfirmedCase = [];
        var monthlyLabel = [];
        var Count = 0;
        var confirmedCases = 0;
        var previousMonth = '';
        apiData.cases_time_series.map((data) => {
            Count++;
            var dated = data.date;
            dated = dated.split(' ');
            var month = dated[1];
            if (previousMonth === '') {
                previousMonth = month;
            }
            if (month === previousMonth) {
                confirmedCases = parseInt(confirmedCases) + parseInt(data.dailyconfirmed);
            } else {
                monthlyConfirmedCase.push(confirmedCases);
                confirmedCases = 0;
                previousMonth = month;
            }
            if (Count === apiData.cases_time_series.length) {
                monthlyConfirmedCase.push(confirmedCases);
                confirmedCases = 0;
            }
            if (month && monthlyLabel.indexOf(month) === -1) {
                monthlyLabel.push(month);
            }
            return null;

        });

        this.setState({
            labels: monthlyLabel,
            confirmeds: monthlyConfirmedCase
        });
    }

    //For Toggling Column
    toggleLine = (event) => {
        this.setState((prevState, prevProps) => ({ toggledLine: !prevState.toggledLine }))
    }

    render() {
        //console.log(this.state.labels);
        //console.log(this.state.confirmeds);

        return (
            <div className="daily-trend-container">
                <div className="title"><span>Daily Spread Trends</span></div>
                <div className="daily-trends">
                    {/* <div className="buttons-left" style={{ border: '1px solid red' }}>
                        
                    </div> */}
                    <div className="buttons" style={{ marginTop: '10px' }}>
                        <button onClick={this.toggleLine} id="toggle-line"
                            style={{ float: 'left', marginLeft: '2px' }}>Toggle Column
                        </button>
                        <button onClick={this.loadDayData} id="day">Day</button>
                        <button onClick={this.loadWeekData} id="week">Week</button>
                        <button onClick={this.loadMonthData} id="month">Month</button>
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
                                categories: this.props.labels === undefined ? this.state.labels : this.props.labels,
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
                                data: this.props.confirmed === undefined ? this.state.confirmeds : this.props.confirmed,
                                color: `${this.props.isDark ? '#fff' : 'skyblue'}`,
                                tooltip: {
                                    valueSuffix: ' Infected'
                                },
                            }, {
                                type: 'spline',
                                enableMouseTracking: this.state.toggledLine ? false : true,
                                name: 'Infected',
                                data: this.props.confirmed === undefined ? this.state.confirmeds : this.props.confirmed,
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

export default DailyTrends
