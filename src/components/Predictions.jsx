import React, { Component } from 'react'
import PredictionTrends from './PredictionTrends'
import axios from 'axios'

export class Predictions extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {


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
            this.loadMonthData(data);
            this.loadWeekData(data);

        }).catch(error => console.log(error.message))



    }

    loadWeekData = (data) => {
        let apiData = data;
        var weekCount = 0;
        var weekdata = 0;
        var weeklyDataSub = [];
        var weeklyLabel = [];
        var weekLabel = '';
        // console.log(apiData.cases_time_series);
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

            if (weeklySeriesCount % 7 !== 0 && ((weekLoopCount) === weeklySeriesCount)) {
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

        let weekDataUpdated = [];
        for (let i = 0; i < weeklyDataSub.length; i++) {
            if (i >= 9) {
                weekDataUpdated.push(weeklyDataSub[i])
            }
        }
        this.setState({
            weekLabels: weeklyLabel,
            weekConfirmeds: weekDataUpdated
        });

        // console.log(this.state)
    }

    loadMonthData = (data) => {
        let apiData = data;
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

        let monthDataUpdated = [];
        for (let i = 0; i < monthlyConfirmedCase.length; i++) {
            if (i >= 3) {
                monthDataUpdated.push(monthlyConfirmedCase[i])
            }
        }

        this.setState({
            monthLabels: monthlyLabel,
            monthConfirmeds: monthDataUpdated
        });
    }

    render() {
        return (
            <>
                <div style={{ marginTop: '20px', marginBottom: '50px' }}>
                    <div className="disclaimer" style={{ width: "100%" }}>
                        <div className="disclaimer-content" style={{
                            width: `93%`,
                            margin: '0 auto',
                            border: `0.4px solid ${this.props.isDark ? '#eee' : '#1c1c1c'}`,
                            padding: '8px',
                            textAlign: `${window.screen.width < 600 ? 'left' : 'center'}`
                        }}>
                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Disclaimer: </span>
                            <span style={{ fontSize: '14px' }}> Below statistics are completely fictitous.
                            It's not actual data records,
                            but just a prediction from confirmed cases of covid 19 patients across the world.</span>
                        </div>

                    </div>
                    <PredictionTrends isDark={this.props.isDark} stateData={this.state} />
                </div>
            </>
        )
    }
}

export default Predictions
