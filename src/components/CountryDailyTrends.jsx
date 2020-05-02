import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

class CountryDailyTrends extends Component {
    constructor(props) {
        super(props);

        // this.loadDayData = this.loadDayData.bind(this);
        // this.loadWeekData = this.loadWeekData.bind(this);
        // this.loadMonthData = this.loadMonthData.bind(this);

        this.state = {
            labels: this.props.labels,
            confirmeds: this.props.confirmed,
            toggledLine: true
        }
        // this.chartRef = createRef()
    }

    loadDayData = (event) => {
        let labels = this.props.labels;
        let confirmeds = this.props.confirmed;

        this.setState({
            labels: labels,
            confirmeds: confirmeds
        });
    }

    loadWeekData = (event) => {
        let apiData = this.props.apiresponseData;

        var weekCount = 0;
        var weekdata = 0;
        var weeklyDataSub = [];
        var weeklyLabel = [];
        var weekLabel = '';
        var count = 0;
        var previousCount = 0;
        apiData.map((data) => {
            //console.log(data);
            var DailyConfirmedCases = 0;
            weekCount++;
            if (weekCount === 1) {
                weekLabel = data.date;
            }

            previousCount = count - 1;
            if (previousCount < 0) { previousCount = 0; }
            count++;
            if (previousCount === 0) {
                DailyConfirmedCases = data.confirmed;
            } else {
                DailyConfirmedCases = data.confirmed - apiData[previousCount].confirmed;
            }
            //console.log(DailyConfirmedCases);
            weekdata = parseInt(weekdata) + parseInt(DailyConfirmedCases);

            if (weekCount === 7) {
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
        //this.props.countryStateData.labels = weeklyLabel;
        //console.log(weeklyLabel);
        //console.log(weeklyDataSub);
        //console.log(thisVariable);
        //this.props.labels = weeklyLabel;
        //thisVariable.props.updateStateGraphData();
    }

    loadMonthData = (event) => {
        let apiData = this.props.apiresponseData;

        var monthlyConfirmedCase = [];
        var monthlyLabel = [];
        var Count = 0;
        var confirmedCases = 0;
        var previousMonth = '';
        var previousCount = 0;
        var count = 0;
        apiData.map((data) => {
            Count++;
            var dated = data.date;
            var newdated = dated.split('-');
            var timestamp = new Date(newdated[1] + "-" + newdated[2] + "-" + newdated[0]).getTime();
            var newdate = new Date(timestamp);
            newdate = newdate.toString("dd/MM");
            newdate = newdate.split(' ');
            newdate = newdate[2] + ' ' + newdate[1];
            //var newdated = new date('d M', strtotime(dated) );
            dated = newdate;
            var DailyConfirmedCases = 0;

            dated = dated.split(' ');
            var month = dated[1];
            if (previousMonth === '') {
                previousMonth = month;
            }

            previousCount = count - 1;
            if (previousCount < 0) { previousCount = 0; }
            count++;
            if (previousCount === 0) {
                DailyConfirmedCases = data.confirmed;
            } else {
                DailyConfirmedCases = data.confirmed - apiData[previousCount].confirmed;
            }

            if (month === previousMonth) {
                confirmedCases = parseInt(confirmedCases) + parseInt(DailyConfirmedCases);
            } else {
                monthlyConfirmedCase.push(confirmedCases);
                confirmedCases = 0;
                previousMonth = month;
            }
            if (Count === apiData.length) {
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.confirmed !== this.props.confirmed) {
            this.setState({ confirmeds: this.props.confirmed, labels: this.props.labels })
        }
    }

    render() {
        //console.log(this.state.labels);
        //console.log(this);

        let confirmedDatas = this.state.confirmeds;
        let labels = this.state.labels;
        //console.log(data);
        if (confirmedDatas.length <= 0) {
            confirmedDatas = this.props.confirmed;
            labels = this.props.labels;
        }

        return (
            <div className="daily-trend-container" style={{
                width: `${this.props.width !== undefined ? window.screen.width > 767 ? '100%' : this.props.width : window.screen.width > 767 ? '50%' : '100%'}`
            }}>
                <span style={{
                    textAlign: 'center',
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                    paddingTop: '-8px',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>{this.props.country !== undefined ? this.props.country : 'Daily Spread Trends'} </span>
                <div className="daily-trends">
                    {/* <div className="buttons-left" style={{ border: '1px solid red' }}>
                        
                    </div> */}
                    <div className="buttons" style={{ marginTop: '10px' }}>
                        <button onClick={this.toggleLine} id="toggle-line"
                            style={{ float: 'left', marginLeft: '2px' }}>Toggle Column
                        </button>
                        <button
                            style={{ display: `${this.props.comparision ? 'none' : 'inline-block'}` }}
                            onClick={this.loadDayData} id="day">Day</button>
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
                                categories: labels,
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
                                type: `${this.state.toggledLine ? 'column' : 'spline'}`,
                                yAxis: 1,
                                data: confirmedDatas,
                                color: `${this.props.isDark ? '#fff' : 'skyblue'}`,
                                tooltip: {
                                    valueSuffix: ' infected'
                                },
                            }, {
                                type: 'spline',
                                data: confirmedDatas,
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

export default CountryDailyTrends
