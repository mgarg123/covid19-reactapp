import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Error404 from './Error404'
import AboutCorona from '../src/components/AboutCorona'
import CountryData from '../src/components/CountryData'
import WorldData from '../src/components/WorldData'
import axios from 'axios'

export class Routing extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isDark: true,
            // labels: [],
            // confirmed: [],
            // recover: [],
            // deaths: []
        }
    }

    componentDidMount() {
        let url = "https://pomber.github.io/covid19/timeseries.json"

        // var currentURL = window.location.href;

        axios.get(url).then(response => {
            let data = response.data
            // let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            // //console.log(data);

            // let cData = [];
            // var countryData = [];
            var worldData = data;

            // if (currentURL.indexOf('china') !== -1) {
            //     cData = data.China;
            //     countryData = data.China;
            // }
            // if (currentURL.indexOf('italy') !== -1) {
            //     cData = data.Italy;
            //     countryData = data.Italy;
            // }
            // if (currentURL.indexOf('spain') !== -1) {
            //     cData = data.Spain;
            //     countryData = data.Spain;
            // }
            /*if (this.props.country === "china") {
                cData = data.China;
                countryData = data.China;
                //console.log(cData);
                
            } else if (this.props.country === "spain") {
                cData = data.Spain;
                countryData = data.Spain;
            } else {
                cData = data.Italy;
                countryData = data.Italy;
            }*/

            // let labels = cData.map(x => x.date.split("-")[2] + " " + monthName[parseInt(x.date.split("-")[1]) - 1])
            // let recover = cData.map(x => x.recovered)
            //let deaths = cData.map(x => x.deaths)
            //let confirmed = cData.map(x => x.deaths)
            //let confirmed = cData.map(x => x.deaths)
            // var previousCount = 0;
            // var count = 0;
            // var DailyConfirmedCases = 0;
            // var DailyDeathRecords = 0;
            // var confirmed = [];
            // var deaths = [];
            // cData.map(function (confirmedDatas) {
            //     previousCount = count - 1;
            //     if (previousCount < 0) { previousCount = 0; }
            //     count++;
            //     if (previousCount == 0) {
            //         DailyConfirmedCases = confirmedDatas.confirmed;
            //         DailyDeathRecords = confirmedDatas.deaths;
            //     } else {
            //         DailyConfirmedCases = confirmedDatas.confirmed - cData[previousCount].confirmed;
            //         DailyDeathRecords = confirmedDatas.deaths - cData[previousCount].deaths;
            //     }
            //     confirmed.push(DailyConfirmedCases);
            //     deaths.push(DailyDeathRecords);
            // });

            this.setState({
                // labels: labels,
                // confirmed: confirmed,
                // deaths: deaths,
                // recover: recover,
                // apiresponseData: countryData,
                worldPatientsData: worldData
            })
            // console.log(deaths)
            // console.log(confirmed)
            // console.log(recover)
        }).catch(error => console.log(error.message))
    }

    render() {
        //console.log('from routing');
        //console.log(this.state.worldData);
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={App}></Route>
                    <Route exact path='/about-corona' component={AboutCorona}></Route>
                    <Route exact path='/corona-patients-in-world'><WorldData worldPatientsData={this.state.worldPatientsData} /> </Route>
                    {/* <Route exact path='/china-data'><CountryData country={"china"} countryStateData={this.state} /></Route>
                    <Route exact path='/spain-data'><CountryData country={"spain"} countryStateData={this.state} /></Route>
                    <Route exact path='/italy-data'><CountryData country={"italy"} countryStateData={this.state} /></Route> */}
                    <Route path='/world-data/:countryname' component={CountryData}></Route>
                    <Route component={Error404}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Routing
