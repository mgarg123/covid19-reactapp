import React, { Component, Fragment } from 'react'
import DailyTrends from './DailyTrends'
import DeathVsRecovered from './DeathVsRecovered'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'

class CountryData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDark: true,
            labels: [],
            confirmed: [],
            recover: [],
            deaths: []
        }
    }

    componentDidMount() {
        let url = "https://pomber.github.io/covid19/timeseries.json"

        axios.get(url).then(response => {
            let data = response.data
            let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            console.log(data)
            let cData = []
            if (this.props.country === "china") {
                cData = data.China
            } else if (this.props.country === "spain") {
                cData = data.Spain
            } else {
                cData = data.Italy
            }

            let labels = cData.map(x => x.date.split("-")[2] + " " + monthName[parseInt(x.date.split("-")[1]) - 1])
            let recover = cData.map(x => x.recovered)
            let deaths = cData.map(x => x.deaths)
            let confirmed = cData.map(x => x.deaths)

            this.setState({
                labels: labels,
                confirmed: confirmed,
                deaths: deaths,
                recover: recover
            })

            // console.log(labels)
            // console.log(deaths)
            // console.log(confirmed)
            // console.log(recover)
        }).catch(error => console.log(error.message))
    }


    isDarkModeActive = (isDark) => {
        this.setState({ isDark: isDark })
    }

    render() {
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
                    <DailyTrends isDark={this.state.isDark} labels={this.state.labels} confirmed={this.state.confirmed} />
                    <DeathVsRecovered isDark={this.state.isDark} labels={this.state.labels} deaths={this.state.deaths} recover={this.state.recover} />
                </div>
                <Footer isDark={this.state.isDark} />
            </Fragment>
        )
    }
}

export default CountryData
