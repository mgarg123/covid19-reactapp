import React, { Component, Fragment } from 'react'
import CountryDailyTrends from './CountryDailyTrends'
import DeathVsRecovered from './DeathVsRecovered'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import WorldCase from './WorldCase'

class CountryData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDark: true,
            //labels: [],
            //confirmeds: []
            // labels: this.props.countryStateData.labels,
            // confirmeds: this.props.countryStateData.confirmed,
            //recover: this.props.countryStateData.recover,
            //deaths: this.props.countryStateData.deaths
            labels: [],
            confirmed: [],
            recover: [],
            deaths: [],
            countryStat: {}

        }
    }

    whichTab = (isStat, isState, isGraphs) => {
        // setStatsClicked(isStat)
        // setStatewiseClicked(isState)
        // setGraphsClicked(isGraphs)
    }

    isDarkModeActive = (isDark) => {
        this.setState({ isDark: isDark })
    }

    componentDidMount() {
        const { match: { params } } = this.props
        let url = 'https://pomber.github.io/covid19/timeseries.json'
        axios.get(url).then(response => {
            let data = response.data
            let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            var previousCount = 0;
            var count = 0;
            var DailyConfirmedCases = 0;
            var DailyDeathRecords = 0;
            var confirmed = []
            var deaths = []
            let country = params.countryname.replace('-', ' ')
            let cData = data[country].map(x => x)


            let labels = cData.map(x => x.date.split("-")[2] + " " + monthName[parseInt(x.date.split("-")[1]) - 1])
            let recover = cData.map(x => x.recovered)

            //Setting up statistics
            let cntryStat = {
                confirmed: cData[cData.length - 1].confirmed,
                deaths: cData[cData.length - 1].deaths,
                recovered: cData[cData.length - 1].recovered,
                active: cData[cData.length - 1].confirmed - (cData[cData.length - 1].deaths + cData[cData.length - 1].recovered),
                deathRate: ((cData[cData.length - 1].deaths / cData[cData.length - 1].confirmed) * 100).toPrecision(3) + "%",
                recoveryRate: ((cData[cData.length - 1].recovered / cData[cData.length - 1].confirmed) * 100).toPrecision(3) + "%",
                activeRate: (((cData[cData.length - 1].confirmed - (cData[cData.length - 1].deaths + cData[cData.length - 1].recovered)) /
                    cData[cData.length - 1].confirmed) * 100).toPrecision(3) + "%"
            }

            this.setState({ countryStat: cntryStat })

            cData.map((confirmedDatas) => {
                previousCount = count - 1;
                if (previousCount < 0) { previousCount = 0; }
                count++;
                if (previousCount === 0) {
                    DailyConfirmedCases = confirmedDatas.confirmed;
                    DailyDeathRecords = confirmedDatas.deaths;
                } else {
                    DailyConfirmedCases = confirmedDatas.confirmed - cData[previousCount].confirmed;
                    DailyDeathRecords = confirmedDatas.deaths - cData[previousCount].deaths;
                }
                confirmed.push(DailyConfirmedCases);
                deaths.push(DailyDeathRecords);
                return null;
            });

            this.setState({
                labels: labels,
                confirmed: confirmed,
                deaths: deaths,
                apiresponseData: cData,
                recover: recover
            })
            // console.log(this.state.confirmed);
            // console.log(this.state.labels);

        }).catch(error => console.log(error.message))

    }

    render() {
        //console.log(this.state);

        return (
            <Fragment>
                <Header isDarkCallBack={this.isDarkModeActive} isSwitched={localStorage.getItem('ncovindia_isDark') === 'true'} />
                {/* <HeaderTab tabs={["Stats", "Graphs"]} tabClickedCallBack={this.whichTab} /> */}
                <div className='cd-country-name' style={{
                    marginTop: '-10px', width: '100%',
                    textAlign: 'center',
                    paddingBottom: '15px',
                    background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#262626' : '#fff'}`
                }}>
                    <span style={{
                        color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#fff' : '#222'}`,
                        fontSize: '23px',
                        fontWeight: 'bold',
                        letterSpacing: '0.6px',
                        borderBottom: '3px solid skyblue',
                        padding: '0px 7px',
                        margin: '10px 0 0 0'
                    }}>
                        Country name: {this.props.match.params.countryname.replace('-', ' ')}</span>
                </div>
                <div className="country-data"
                    style={{
                        display: "flex",
                        flexDirection: `${window.screen.width <= 767 ? 'column' : 'row'}`,
                        width: '100%',
                        background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#262626' : '#fff'}`
                    }}
                >
                    <WorldCase countryStat={this.state.countryStat} />
                    <CountryDailyTrends
                        isDark={this.state.isDark}
                        labels={this.state.labels}
                        confirmed={this.state.confirmed}
                        apiresponseData={this.state.apiresponseData}
                    //updateStateGraphData={this._handleGraphData} 
                    />
                </div>
                <div className="cd-dvr" style={{
                    width: '100%',
                    background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#262626' : '#fff'}`,
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <DeathVsRecovered isDark={this.state.isDark}
                        margin={'52px'}
                        labels={this.state.labels}
                        deaths={this.state.deaths}
                        recover={this.state.recover} />
                </div>
                <Footer isDark={this.state.isDark} />
            </Fragment>
        )
    }
}

export default CountryData
