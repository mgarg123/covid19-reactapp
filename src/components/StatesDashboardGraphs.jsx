import React, { Component } from 'react'
import axios from 'axios'
import StatesDailySpreadTrends from './StatesDailySpreadTrends'
import '../css/plot.css'
import { Translation } from 'react-i18next'
import DeathVsRecovered from './DeathVsRecovered'

export class StatesDashboardGraphs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labels: [],
            confirmed: [],
            deaths: [],
            recovered: [],
            totalLabel: [],
            totalConfirmed: [],
            totalDeaths: [],
            totalRecovered: [],
            selectedDistrictName: "Total"
        }
    }

    componentDidMount() {
        let url = "https://covidstat.info/graphql"
        let query = `{
                    state(countryName:"India",stateName:${this.props.stateName}){
                        historical{
                            date
                            cases
                            deaths
                            recovered
                        }
                    }
        }`
        axios({
            url: url,
            method: "post",
            data: {
                query: query
            }
        }).then(res => {
            let data = res.data.data.state
            let month = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"]

            let labels = data.historical.map(x => x.date.split('/')[1] + " " + month[parseInt(x.date.split('/')[0]) - 1])
            let confirmedCases = data.historical.map(x => x.cases)
            let deaths = data.historical.map(x => x.deaths)
            let recovered = data.historical.map(x => x.recovered)

            // console.log(labels);
            // console.log(confirmedCases);
            this.setState({
                labels: labels,
                confirmed: confirmedCases,
                deaths: deaths,
                recovered: recovered,
                totalConfirmed: confirmedCases,
                totalLabel: labels,
                totalDeaths: deaths,
                totalRecovered: recovered
            })

        }).catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedDistrictName !== prevState.selectedDistrictName) {
            if (this.state.selectedDistrictName === "Total") {
                this.setState({
                    labels: this.state.totalLabel,
                    confirmed: this.state.totalConfirmed,
                    deaths: this.state.totalDeaths,
                    recovered: this.state.totalRecovered,
                })
            } else {
                let url = "https://covidstat.info/graphql"
                axios({
                    url: url,
                    method: "post",
                    data: {
                        query: `{
                            state(countryName:"India",stateName:${this.props.stateName}){
                                districts{
                                    district
                                    historical{
                                        date
                                        cases
                                        deaths
                                        recovered
                                    }
                                }
                            }
                        }`
                    }
                }).then(res => {
                    let data = res.data.data.state.districts
                    let month = ["January", "February", "March", "April", "May", "June", "July",
                        "August", "September", "October", "November", "December"]

                    // console.log(data);
                    let districtData = data.filter(x => x.district === this.state.selectedDistrictName)[0]
                    // console.log(districtData);

                    let labels = districtData.historical.map(x => x.date.split('/')[1] + " " + month[parseInt(x.date.split('/')[0]) - 1])
                    let confirmedCases = districtData.historical.map(x => x.cases)
                    let deaths = districtData.historical.map(x => x.deaths)
                    let recovered = districtData.historical.map(x => x.recovered)

                    // console.log(labels);
                    // console.log(confirmedCases);
                    this.setState({
                        labels: labels,
                        confirmed: confirmedCases,
                        deaths: deaths,
                        recovered: recovered
                    })

                }).catch(err => console.log(err.message));

            }
        }
    }

    render() {
        return (
            <div className="graphs-main-cont">
                <div className="district-selector buttons" style={{
                    display: 'flex', justifyContent: "center"
                }}>
                    <select name="" id="district-dropdown"
                        onChange={(event) => this.setState({ selectedDistrictName: event.target.value })}
                        value={this.state.selectedDistrictName}
                        style={{
                            width: "170px",
                            height: "30px",
                            borderRadius: "8px",
                            boxShadow: `1px 2px 6px 1px rgba(0,0,0,${this.props.isDark ? '0.9' : '0.4'})`
                        }}>
                        <option key="Total" value="Total">Total</option>
                        {
                            this.props.districtData.map(x => {
                                return (
                                    <Translation key={x.district}>
                                        {t => <option value={x.district}>{t(x.district)}</option>}
                                    </Translation>

                                )
                            })

                        }
                    </select>
                </div>
                <div className="graphs-holder">
                    <StatesDailySpreadTrends labels={this.state.labels} confirmed={this.state.confirmed} isDark={this.props.isDark} />
                    <DeathVsRecovered isDark={this.props.isDark} deaths={this.state.deaths} labels={this.state.labels} recover={this.state.recovered} />
                </div>

            </div >
        )
    }
}

export default StatesDashboardGraphs
