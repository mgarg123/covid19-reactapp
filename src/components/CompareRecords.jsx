import React, { Component, Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import CountryDailyTrends from './CountryDailyTrends'

export class CompareRecords extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDark: true,
            countriesList: [],
            country1: '',
            country2: '',
            country3: '',
            labels1: [],
            confirmeds1: [],
            labels2: [],
            confirmeds2: [],
            labels3: [],
            confirmeds3: [],
            data: []

        }
    }

    componentDidMount() {
        let data = this.props.data
        let countriesList = Object.keys(data)
        this.setState({ countriesList: countriesList })
    }

    isDarkModeActive = (isDark) => {
        this.setState({ isDark: isDark })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.country1 !== prevState.country1) {
            let data = this.props.data
            let country = this.state.country1
            let cData = data[country].map(x => x)

            let weekCount = 0;
            let weekdata = 0;
            let weeklyDataSub = [];
            let weeklyLabel = [];
            let weekLabel = '';
            let count = 0;
            let previousCount = 0;
            cData.map((data) => {
                //console.log(data);
                let DailyConfirmedCases = 0;
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
                    DailyConfirmedCases = data.confirmed - cData[previousCount].confirmed;
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
                labels1: weeklyLabel,
                confirmeds1: weeklyDataSub,
                data: cData
            });
        }
        if (this.state.country2 !== prevState.country2) {
            let data = this.props.data
            let country = this.state.country2
            let cData = data[country].map(x => x)

            let weekCount = 0;
            let weekdata = 0;
            let weeklyDataSub = [];
            let weeklyLabel = [];
            let weekLabel = '';
            let count = 0;
            let previousCount = 0;
            cData.map((data) => {
                //console.log(data);
                let DailyConfirmedCases = 0;
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
                    DailyConfirmedCases = data.confirmed - cData[previousCount].confirmed;
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
                labels2: weeklyLabel,
                confirmeds2: weeklyDataSub,
                data: cData
            });
        }
        if (this.state.country3 !== prevState.country3) {
            let data = this.props.data
            let country = this.state.country3
            let cData = data[country].map(x => x)

            let weekCount = 0;
            let weekdata = 0;
            let weeklyDataSub = [];
            let weeklyLabel = [];
            let weekLabel = '';
            let count = 0;
            let previousCount = 0;
            cData.map((data) => {
                //console.log(data);
                let DailyConfirmedCases = 0;
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
                    DailyConfirmedCases = data.confirmed - cData[previousCount].confirmed;
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
                labels3: weeklyLabel,
                confirmeds3: weeklyDataSub,
                data: cData
            });
        }

    }

    render() {
        return (
            <Fragment>
                <Header isDarkCallBack={this.isDarkModeActive} />
                <div className="compare-records-holder" style={{
                    marginTop: '-10px',
                    background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#262626' : '#ffff'}`,
                    color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#fff' : '#2d2d2d'}`
                }}>
                    <div className="compare-title">
                        <span>Compare Country Records</span>
                    </div>
                    <div className="comp-country-list">
                        <div className="comp-country">
                            <div>
                                <span>Country 1</span>
                            </div>
                            <div className="country-dropdown">
                                <select name="" className="comp-dropdown" value={this.state.country1}
                                    onChange={(event) => this.setState({ country1: event.target.value })}
                                >
                                    <option value="" disabled={true}>Select Country</option>
                                    {
                                        this.state.countriesList.map(x =>
                                            <option value={x} key={x}>{x}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="comp-country">
                            <div>
                                <span>Country 2</span>
                            </div>
                            <div className="country-dropdown">
                                <select name="" className="comp-dropdown" value={this.state.country2}
                                    onChange={(event) => this.setState({ country2: event.target.value })} >
                                    <option value="" disabled={true}>Select Country</option>
                                    {
                                        this.state.countriesList.map(x =>
                                            <option value={x} key={x}>{x}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="comp-country">
                            <div>
                                <span>Country 3</span>
                            </div>
                            <div className="country-dropdown">
                                <select name="" className="comp-dropdown" onChange={(event) => this.setState({ country3: event.target.value })}
                                    value={this.state.country3}>
                                    <option value="" disabled={true}>Select Country</option>
                                    {
                                        this.state.countriesList.map(x =>
                                            <option value={x} key={x}>{x}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="countries-graph-holder">
                        <div className="countries-graphs">
                            <div className="country-graph">
                                {
                                    this.state.country1 !== "" ?
                                        <CountryDailyTrends width={'100%'}
                                            isDark={this.state.isDark}
                                            comparision={true}
                                            country={this.state.country1}
                                            labels={this.state.labels1}
                                            confirmed={this.state.confirmeds1}
                                            apiresponseData={this.state.data}
                                        /> : <div className='select-country-to-comp'>
                                            <div>
                                                Select Country to Compare
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="country-graph">
                                {
                                    this.state.country2 !== "" ?
                                        <CountryDailyTrends width={'100%'}
                                            isDark={this.state.isDark}
                                            comparision={true}
                                            country={this.state.country2}
                                            labels={this.state.labels2}
                                            confirmed={this.state.confirmeds2}
                                            apiresponseData={this.state.data}
                                        /> : <div className='select-country-to-comp sctc2'>
                                            <div>
                                                Select Country to Compare
                                            </div>
                                        </div>
                                }
                            </div>
                            <div className="country-graph">
                                {
                                    this.state.country3 !== "" ?
                                        <CountryDailyTrends width={'100%'}
                                            isDark={this.state.isDark}
                                            comparision={true}
                                            country={this.state.country3}
                                            labels={this.state.labels3}
                                            confirmed={this.state.confirmeds3}
                                            apiresponseData={this.state.data}
                                        /> : <div className='select-country-to-comp sctc-3'>
                                            <div>
                                                Select Country to Compare
                                            </div>
                                        </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default CompareRecords
