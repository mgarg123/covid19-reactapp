import React, { Component, Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import CountryDailyTrends from './CountryDailyTrends'
import DeathVsRecovered from './DeathVsRecovered'
import CompareTrendsMerged from './CompareTrendsMerged'
import StackedColumn from './StackedColumn'
import { connect } from 'react-redux'

export class CompareRecords extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDark: true,
            countriesList: [],
            graphType: 'Spread Trend',
            graphContainer: 'Merged',
            country1: '',
            country2: '',
            country3: '',
            labels1: [],
            confirmeds1: [],
            labels2: [],
            confirmeds2: [],
            labels3: [],
            confirmeds3: [],
            deaths1: [],
            recover1: [],
            deaths2: [],
            recover2: [],
            deaths3: [],
            recover3: [],
            apiresponseData1: [],
            apiresponseData2: [],
            apiresponseData3: [],
            data: [],
            btnClicked: false,
            selectedCountryCount: 0

        }
    }

    componentDidMount() {
        let data = this.props.data
        let countriesList = Object.keys(data)
        let countriesData = Object.values(data)

        let cData = []
        for (let i = 0; i < countriesData.length; i++) {
            let obj = {
                country: countriesList[i],
                vals: countriesData[i][countriesData[i].length - 1]
            }
            cData.push(obj)
        }
        cData.sort((x, y) => y.vals.confirmed - x.vals.confirmed)
        console.log(cData);
        this.setState({ countriesList: cData })
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.country1 !== prevState.country1 && this.state.country1 !== "") {

            let data = this.props.data
            let country = this.state.country1
            let cData = data[country].map(x => x)


            let weekCount = 0;
            let weekdata = 0;
            let weeklyDataSub = [];
            let weekdataDth = 0;
            let weekdataRec = 0;
            let weeklyDataDth = [];
            let weeklyDataRec = [];
            let weeklyLabel = [];
            let weekLabel = '';
            let count = 0;
            let previousCount = 0;
            cData.map((data) => {
                //console.log(data);
                let DailyConfirmedCases = 0;
                let DailyDeathCases = 0;
                let DailyRecoveredCases = 0;
                weekCount++;
                if (weekCount === 1) {
                    weekLabel = data.date;
                }

                previousCount = count - 1;
                if (previousCount < 0) { previousCount = 0; }
                count++;
                if (previousCount === 0) {
                    DailyConfirmedCases = data.confirmed;
                    DailyDeathCases = data.recovered;
                    DailyRecoveredCases = data.deaths;
                } else {
                    DailyConfirmedCases = data.confirmed - cData[previousCount].confirmed;
                    DailyDeathCases = data.deaths - cData[previousCount].deaths;
                    DailyRecoveredCases = data.recovered - cData[previousCount].recovered;
                }
                //console.log(DailyConfirmedCases);
                weekdata = parseInt(weekdata) + parseInt(DailyConfirmedCases);
                weekdataDth = parseInt(weekdataDth) + parseInt(DailyDeathCases);
                weekdataRec = parseInt(weekdataRec) + parseInt(DailyRecoveredCases);

                if (weekCount === 7) {
                    weekLabel = weekLabel + ' - ' + data.date;
                    weeklyLabel.push(weekLabel);
                    weeklyDataSub.push(weekdata);
                    weeklyDataDth.push(weekdataDth);
                    weeklyDataRec.push(weekdataRec);
                    weekdata = 0;
                    weekCount = 0;
                    weekLabel = '';
                }
                return null;
            });

            this.setState({
                labels1: weeklyLabel,
                confirmeds1: weeklyDataSub,
                deaths1: weeklyDataDth,
                recover1: weeklyDataRec,
                apiresponseData1: cData,
                selectedCountryCount: this.state.selectedCountryCount + 1
            });
        }
        if (this.state.country2 !== prevState.country2 && this.state.country2 !== "") {
            let data = this.props.data
            let country = this.state.country2
            let cData = data[country].map(x => x)

            let weekCount = 0;
            let weekdata = 0;
            let weeklyDataSub = [];
            let weekdataDth = 0;
            let weekdataRec = 0;
            let weeklyDataDth = [];
            let weeklyDataRec = [];
            let weeklyLabel = [];
            let weekLabel = '';
            let count = 0;
            let previousCount = 0;
            cData.map((data) => {
                //console.log(data);
                let DailyConfirmedCases = 0;
                let DailyDeathCases = 0;
                let DailyRecoveredCases = 0;
                weekCount++;
                if (weekCount === 1) {
                    weekLabel = data.date;
                }

                previousCount = count - 1;
                if (previousCount < 0) { previousCount = 0; }
                count++;
                if (previousCount === 0) {
                    DailyConfirmedCases = data.confirmed;
                    DailyDeathCases = data.recovered;
                    DailyRecoveredCases = data.deaths;
                } else {
                    DailyConfirmedCases = data.confirmed - cData[previousCount].confirmed;
                    DailyDeathCases = data.deaths - cData[previousCount].deaths;
                    DailyRecoveredCases = data.recovered - cData[previousCount].recovered;
                }
                //console.log(DailyConfirmedCases);
                weekdata = parseInt(weekdata) + parseInt(DailyConfirmedCases);
                weekdataDth = parseInt(weekdataDth) + parseInt(DailyDeathCases);
                weekdataRec = parseInt(weekdataRec) + parseInt(DailyRecoveredCases);

                if (weekCount === 7) {
                    weekLabel = weekLabel + ' - ' + data.date;
                    weeklyLabel.push(weekLabel);
                    weeklyDataSub.push(weekdata);
                    weeklyDataDth.push(weekdataDth);
                    weeklyDataRec.push(weekdataRec);
                    weekdata = 0;
                    weekCount = 0;
                    weekLabel = '';
                }
                return null;
            });

            this.setState({
                labels2: weeklyLabel,
                confirmeds2: weeklyDataSub,
                deaths2: weeklyDataDth,
                recover2: weeklyDataRec,
                apiresponseData2: cData,
                selectedCountryCount: this.state.selectedCountryCount + 1
            });
        }
        if (this.state.country3 !== prevState.country3 && this.state.country3 !== "") {
            let data = this.props.data
            let country = this.state.country3
            let cData = data[country].map(x => x)

            let weekCount = 0;
            let weekdata = 0;
            let weeklyDataSub = [];
            let weekdataDth = 0;
            let weekdataRec = 0;
            let weeklyDataDth = [];
            let weeklyDataRec = [];
            let weeklyLabel = [];
            let weekLabel = '';
            let count = 0;
            let previousCount = 0;
            cData.map((data) => {
                //console.log(data);
                let DailyConfirmedCases = 0;
                let DailyDeathCases = 0;
                let DailyRecoveredCases = 0;
                weekCount++;
                if (weekCount === 1) {
                    weekLabel = data.date;
                }

                previousCount = count - 1;
                if (previousCount < 0) { previousCount = 0; }
                count++;
                if (previousCount === 0) {
                    DailyConfirmedCases = data.confirmed;
                    DailyDeathCases = data.recovered;
                    DailyRecoveredCases = data.deaths;
                } else {
                    DailyConfirmedCases = data.confirmed - cData[previousCount].confirmed;
                    DailyDeathCases = data.deaths - cData[previousCount].deaths;
                    DailyRecoveredCases = data.recovered - cData[previousCount].recovered;
                }
                //console.log(DailyConfirmedCases);
                weekdata = parseInt(weekdata) + parseInt(DailyConfirmedCases);
                weekdataDth = parseInt(weekdataDth) + parseInt(DailyDeathCases);
                weekdataRec = parseInt(weekdataRec) + parseInt(DailyRecoveredCases);

                if (weekCount === 7) {
                    weekLabel = weekLabel + ' - ' + data.date;
                    weeklyLabel.push(weekLabel);
                    weeklyDataSub.push(weekdata);
                    weeklyDataDth.push(weekdataDth);
                    weeklyDataRec.push(weekdataRec);
                    weekdata = 0;
                    weekCount = 0;
                    weekLabel = '';
                }
                return null;
            });

            this.setState({
                labels3: weeklyLabel,
                confirmeds3: weeklyDataSub,
                deaths3: weeklyDataDth,
                recover3: weeklyDataRec,
                apiresponseData3: cData,
                selectedCountryCount: this.state.selectedCountryCount + 1
            });
        }

    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="compare-records-holder" style={{
                    marginTop: '-10px',
                    background: `${this.props.isDark ? '#1e1d21' : '#ffff'}`,
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                }}>
                    <div className="compare-title">
                        <span>Compare Country Records</span>
                    </div>
                    <div className="comp-country-list">
                        <div className="comp-country">
                            <div className="comp-intrnl-cont">
                                <div className="col-1">
                                    <div className="row row1">
                                        <div className="graph-type col-md-6">
                                            <label htmlFor="graphtype">Graph Type</label>
                                            <select name="" id="graphtype" className="comp-dropdown"
                                                style={{
                                                    background: `${this.props.isDark ? '#6b6b6b' : '#fff'}`,
                                                    color: `${this.props.isDark ? '#fff' : '#222'}`
                                                }}
                                                onChange={(event) => this.setState({ graphType: event.target.value })}
                                                value={this.state.graphType}>
                                                <option value="Spread Trend">Spread Trends</option>
                                                <option value='Dth Vs Rec'>Death Vs Recovered</option>
                                                {
                                                    this.state.graphContainer === "Merged" &&
                                                    <>
                                                        <option value="Death Trend">Death Trends</option>
                                                        <option value="Recovery Trend">Recovery Trends</option>
                                                    </>
                                                }
                                            </select>
                                        </div>
                                        <div className="graphContainer col-md-6">
                                            <label htmlFor="graphcontainer">Graph Container</label>
                                            <select name="" id="graphcontainer" className="comp-dropdown"
                                                style={{
                                                    background: `${this.props.isDark ? '#6b6b6b' : '#fff'}`,
                                                    color: `${this.props.isDark ? '#fff' : '#222'}`
                                                }}
                                                onChange={(event) => this.setState({ graphContainer: event.target.value })}
                                                value={this.state.graphContainer}>
                                                <option value="Merged">Merged</option>
                                                <option value="Seperate">Seperate</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row row2">
                                        <div className="country-dropdown col-md-4">
                                            <label htmlFor="country1">Country Name</label>
                                            <select name="" id="country1" className="comp-dropdown"
                                                style={{
                                                    background: `${this.props.isDark ? '#6b6b6b' : '#fff'}`,
                                                    color: `${this.props.isDark ? '#fff' : '#222'}`
                                                }}
                                                value={this.state.country1}
                                                onChange={(event) => this.setState({ country1: event.target.value })}
                                            >
                                                <option value="" disabled={true}>Select Country</option>
                                                {
                                                    this.state.countriesList.map(x =>
                                                        <option value={x.country} key={x.country}>{x.country}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="country-dropdown col-md-4">
                                            <label htmlFor="country2">Country Name</label>
                                            <select name="" id="country2" className="comp-dropdown"
                                                style={{
                                                    background: `${this.props.isDark ? '#6b6b6b' : '#fff'}`,
                                                    color: `${this.props.isDark ? '#fff' : '#222'}`
                                                }}
                                                value={this.state.country2}
                                                onChange={(event) => this.setState({ country2: event.target.value })} >
                                                <option value="" disabled={true}>Select Country</option>
                                                {
                                                    this.state.countriesList.map(x =>
                                                        <option value={x.country} key={x.country}>{x.country}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="country-dropdown col-md-4">
                                            <label htmlFor="country3">Country Name</label>
                                            <select name="" id="country3" className="comp-dropdown"
                                                style={{
                                                    background: `${this.props.isDark ? '#6b6b6b' : '#fff'}`,
                                                    color: `${this.props.isDark ? '#fff' : '#222'}`
                                                }}
                                                onChange={(event) => this.setState({ country3: event.target.value })}
                                                value={this.state.country3}>
                                                <option value="" disabled={true}>Select Country</option>
                                                {
                                                    this.state.countriesList.map(x =>
                                                        <option value={x.country} key={x.country}>{x.country}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="row">
                                        <div className="compare-btn">
                                            <button onClick={() => this.setState({ btnClicked: true })}>Compare</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="reset-btn">
                                            <button
                                                style={{ color: `${this.props.isDark ? '#fff' : '#2d2d2d'}` }}
                                                onClick={() => this.setState({
                                                    graphType: 'Spread Trend',
                                                    graphContainer: 'Merged',
                                                    country1: "",
                                                    country2: "",
                                                    country3: "",
                                                    confirmeds1: [], confirmeds2: [], confirmeds3: [],
                                                    recover1: [], recover2: [], recover3: [],
                                                    deaths1: [], deaths2: [], deaths3: [],
                                                    apiresponseData1: [], apiresponseData2: [], apiresponseData3: [],
                                                    btnClicked: false
                                                })}>Reset</button>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="countries-graph-holder">
                        <div className="countries-graphs">
                            {
                                this.state.btnClicked && this.state.graphContainer === "Seperate" ?
                                    <>
                                        <div className="country-graph" style={{
                                            display: `${this.state.btnClicked && this.state.country1 === '' ? 'none' : 'block'}`
                                        }}>
                                            {
                                                this.state.graphType !== "Dth Vs Rec" ?
                                                    this.state.btnClicked && this.state.country1 !== "" ?
                                                        <CountryDailyTrends width={'100%'}
                                                            isDark={this.props.isDark}
                                                            comparision={true}
                                                            country={this.state.country1}
                                                            labels={this.state.labels1}
                                                            confirmed={this.state.confirmeds1}
                                                            apiresponseData={this.state.apiresponseData1}
                                                        /> :
                                                        <div className='select-country-to-comp'>
                                                            <div>
                                                                Select Country to Compare
                                            </div>
                                                        </div> :
                                                    this.state.btnClicked && this.state.country2 !== "" ?
                                                        <DeathVsRecovered isDark={this.props.isDark}
                                                            labels={this.state.labels1}
                                                            deaths={this.state.deaths1}
                                                            country={this.state.country1}
                                                            width={'100%'}
                                                            recover={this.state.recover1} /> :
                                                        <div className='select-country-to-comp'>
                                                            <div>
                                                                Select Country to Compare
                                            </div>
                                                        </div>
                                            }
                                        </div>
                                        <div className="country-graph" style={{
                                            display: `${this.state.btnClicked && this.state.country2 === '' ? 'none' : 'block'}`
                                        }}>
                                            {
                                                this.state.graphType !== "Dth Vs Rec" ?
                                                    this.state.btnClicked && this.state.country2 !== "" ?
                                                        <CountryDailyTrends width={'100%'}
                                                            isDark={this.props.isDark}
                                                            comparision={true}
                                                            country={this.state.country2}
                                                            labels={this.state.labels2}
                                                            confirmed={this.state.confirmeds2}
                                                            apiresponseData={this.state.apiresponseData2}
                                                        /> : <div className='select-country-to-comp sctc2'>
                                                            <div>
                                                                Select Country to Compare
                                            </div>
                                                        </div> :
                                                    this.state.btnClicked && this.state.country2 !== "" ?
                                                        <DeathVsRecovered isDark={this.props.isDark}
                                                            labels={this.state.labels2}
                                                            deaths={this.state.deaths2}
                                                            country={this.state.country2}
                                                            width={'100%'}
                                                            recover={this.state.recover2} /> :
                                                        <div className='select-country-to-comp'>
                                                            <div>
                                                                Select Country to Compare
                                            </div>
                                                        </div>
                                            }
                                        </div>
                                        <div className="country-graph" style={{
                                            display: `${this.state.btnClicked && this.state.country3 === '' ? 'none' : 'block'}`
                                        }}>
                                            {
                                                this.state.graphType !== "Dth Vs Rec" ?
                                                    this.state.btnClicked && this.state.country3 !== "" ?
                                                        <CountryDailyTrends width={'100%'}
                                                            isDark={this.props.isDark}
                                                            comparision={true}
                                                            country={this.state.country3}
                                                            labels={this.state.labels3}
                                                            confirmed={this.state.confirmeds3}
                                                            apiresponseData={this.state.apiresponseData3}
                                                        /> : <div className='select-country-to-comp sctc-3'>
                                                            <div>
                                                                Select Country to Compare
                                            </div>
                                                        </div> :
                                                    this.state.btnClicked && this.state.country3 !== "" ?
                                                        <DeathVsRecovered isDark={this.props.isDark}
                                                            labels={this.state.labels3}
                                                            deaths={this.state.deaths3}
                                                            country={this.state.country3}
                                                            width={'100%'}
                                                            recover={this.state.recover3} /> :
                                                        <div className='select-country-to-comp'>
                                                            <div>
                                                                Select Country to Compare
                                            </div>
                                                        </div>
                                            }

                                        </div>
                                    </> : this.state.btnClicked && this.state.graphType !== "Dth Vs Rec" ? <CompareTrendsMerged
                                        isDark={this.props.isDark}
                                        country1={this.state.country1}
                                        country2={this.state.country2}
                                        country3={this.state.country3}
                                        labels={this.state.labels1}
                                        graphType={this.state.graphType}
                                        data1={this.state.graphType === "Spread Trend" ? this.state.confirmeds1 :
                                            this.state.graphType === "Death Trend" ? this.state.deaths1 : this.state.recover1}
                                        data2={this.state.graphType === "Spread Trend" ? this.state.confirmeds2 :
                                            this.state.graphType === "Death Trend" ? this.state.deaths2 : this.state.recover2}
                                        data3={this.state.graphType === "Spread Trend" ? this.state.confirmeds3 :
                                            this.state.graphType === "Death Trend" ? this.state.deaths3 : this.state.recover3}
                                        apiresponseData1={this.state.apiresponseData1}
                                        apiresponseData2={this.state.apiresponseData2}
                                        apiresponseData3={this.state.apiresponseData3}

                                    /> : this.state.btnClicked && this.state.graphType === "Dth Vs Rec" ?
                                            <StackedColumn
                                                isDark={this.props.isDark}
                                                labels={this.state.labels1}
                                                country1={this.state.country1}
                                                country2={this.state.country2}
                                                country3={this.state.country3}
                                                deaths1={this.state.deaths1}
                                                deaths2={this.state.deaths2}
                                                deaths3={this.state.deaths3}
                                                recover1={this.state.recover1}
                                                recover2={this.state.recover2}
                                                recover3={this.state.recover3}
                                            /> :
                                            <div className='select-country-to-comp' style={{ border: '1px solid #eee', width: '99%' }}>
                                                <div>
                                                    Select Country to Compare
                                            </div>
                                            </div>
                            }

                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isDark: state.theme.isDark
    }
}

export default connect(mapStateToProps, null)(CompareRecords)
