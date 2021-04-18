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
            apiResponse: [],
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
        let states = {
            "Andaman and Nicobar Islands": "AN",
            "Andhra Pradesh": "AP",
            "Arunachal Pradesh": "AR",
            "Assam": "AS",
            "Bihar": "BR",
            "Chandigarh": "CH",
            "Chhattisgarh": "CT",
            "Dadra and Nagar Haveli": "DN",
            "Daman and Diu": "DD",
            "Delhi": "DL",
            "Goa": "GA",
            "Gujarat": "GJ",
            "Haryana": "HR",
            "Himachal Pradesh": "HP",
            "Jammu and Kashmir": "JK",
            "Jharkhand": "JH",
            "Karnataka": "KA",
            "Kerala": "KL",
            "Lakshadweep": "LD",
            "Madhya Pradesh": "MP",
            "Maharashtra": "MH",
            "Manipur": "MN",
            "Meghalaya": "ML",
            "Mizoram": "MZ",
            "Nagaland": "NL",
            "Odisha": "OR",
            "Puducherry": "PY",
            "Punjab": "PB",
            "Rajasthan": "RJ",
            "Sikkim": "SK",
            "Tamil Nadu": "TN",
            "Telangana": "TG",
            "Tripura": "TR",
            "Uttar Pradesh": "UP",
            "Uttarakhand": "UT",
            "West Bengal": "WB"
        }
        let stateCode = states[this.props.stateName.split("\"")[1]]
        let url = "https://api.covid19india.org/v4/min/timeseries-" + stateCode + ".min.json"
        axios.get(url).then(res => {
            let data = res.data
            let month = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"]

            let dates = Object.keys(data[stateCode].dates)
            let data_total = Object.values(data[stateCode].dates)

            // console.log(dates);
            // console.log(data_total);

            //Fixing data (deceased,recovered)
            for (let i = 0; i < data_total.length; i++) {
                if (data_total[i].total.deceased === undefined)
                    data_total[i].total.deceased = 0
                if (data_total[i].total.recovered === undefined)
                    data_total[i].total.recovered = 0
            }

            let labels = dates.map(x => x.split('-')[2] + "-" + month[parseInt(x.split('-')[1]) - 1] + "-" + x.split('-')[0].substr(2, 4))
            let confirmedCases = data_total.map(x => x.total.confirmed)
            let deaths = data_total.map(x => x.total.deceased)
            let recovered = data_total.map(x => x.total.recovered)

            // console.log(labels);
            // console.log(confirmedCases);

            console.log(data)

            this.setState({
                apiResponse: data[stateCode],
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
                let data = this.state.apiResponse
                let month = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"]

                let districtDatas = data.districts[this.state.selectedDistrictName]

                let dates = Object.keys(districtDatas.dates)
                let data_total = Object.values(districtDatas.dates)


                //Fixing data (deceased,recovered)
                for (let i = 0; i < data_total.length; i++) {
                    if (data_total[i].total.deceased === undefined)
                        data_total[i].total.deceased = 0
                    if (data_total[i].total.recovered === undefined)
                        data_total[i].total.recovered = 0
                }


                let labels = dates.map(x => x.split('-')[2] + "-" + month[parseInt(x.split('-')[1]) - 1] + "-" + x.split('-')[0].substr(2, 4))
                let confirmedCases = data_total.map(x => x.total.confirmed)
                let deaths = data_total.map(x => x.total.deceased)
                let recovered = data_total.map(x => x.total.recovered)

                // console.log(labels);
                // console.log(confirmedCases);
                this.setState({
                    labels: labels,
                    confirmed: confirmedCases,
                    deaths: deaths,
                    recovered: recovered
                })


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
