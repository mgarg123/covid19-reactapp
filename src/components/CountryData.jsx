import React, { Component, Fragment } from 'react'
import CountryDailyTrends from './CountryDailyTrends'
import DeathVsRecovered from './DeathVsRecovered'
import Header from './Header'
import Footer from './Footer'
//import axios from 'axios'

class CountryData extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDark: true,
            //labels: [],
            //confirmeds: []
            labels: this.props.countryStateData.labels,
            confirmeds: this.props.countryStateData.confirmed,
            //recover: this.props.countryStateData.recover,
            //deaths: this.props.countryStateData.deaths
        }
    }

    
    isDarkModeActive = (isDark) => {
        this.setState({ isDark: isDark })
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
                        labels={this.props.countryStateData.labels} 
                        confirmed={this.props.countryStateData.confirmed} 
                        countryStateData={this.props.countryStateData} 
                        apiresponseData={this.props.countryStateData.apiresponseData} 
                        //updateStateGraphData={this._handleGraphData} 
                    />
                    <DeathVsRecovered isDark={this.state.isDark} labels={this.state.labels} deaths={this.state.deaths} recover={this.state.recover} />
                </div>
                <Footer isDark={this.state.isDark} />
            </Fragment>
        )
    }
}

export default CountryData
