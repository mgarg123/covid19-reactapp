import React, { Component, Fragment } from 'react'
import CountryDailyTrends from './CountryDailyTrends'
import DeathVsRecovered from './DeathVsRecovered'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

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
            deaths: []
        }
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
            console.log(this.state.confirmed);
            console.log(this.state.labels);

        }).catch(error => console.log(error.message))

    }

    render() {
        console.log(this);

        return (
            <Fragment>
                <Header isDarkCallBack={this.isDarkModeActive} />
                <div className="country-data"
                    style={{
                        display: "flex",
                        flexDirection: `${window.screen.width <= 767 ? 'column' : 'row'}`,
                        marginBottom: '10px',
                        background: `${this.state.isDark ? '#262626' : '#fff'}`
                    }}
                >
                    <CountryDailyTrends
                        isDark={this.state.isDark}
                        labels={this.state.labels}
                        confirmed={this.state.confirmed}
                        apiresponseData={this.state.apiresponseData}
                    //updateStateGraphData={this._handleGraphData} 
                    />
                    {/* <DeathVsRecovered isDark={this.state.isDark}
                        margin={'60px'}
                        labels={this.state.labels}
                        deaths={this.state.deaths}
                        recover={this.state.recover} /> */}
                </div>
                <Footer isDark={this.state.isDark} />
            </Fragment>
        )
    }
}

export default CountryData
