import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Error404 from './Error404'
import AboutCorona from '../src/components/AboutCorona'
import CountryData from '../src/components/CountryData'
import WorldData from '../src/components/WorldData'
import axios from 'axios'
import ScrollMemory from 'react-router-scroll-memory'
import ReactGA from 'react-ga'
import Donate from './components/Donate'


export class Routing extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isDark: true,
            // labels: [],
            // confirmed: [],
            // recover: [],
            // deaths: [],
            indiaStat: {},
            indiaConfirmed: ''
        }
    }

    componentDidMount() {


        //Initializing Google Analytics
        ReactGA.initialize('UA-155988779-1')


        localStorage.setItem('ncovindia_isDark', 'true')        //Set theme initially to Dark Mode

        //IP Address to Country Name using ipinfo API
        axios.get('https://ipinfo.io?token=d67524c3026916').then(response => {
            let data = response.data
            let countryCode = data.country

            //Country code to country name mapping
            axios.get('https://restcountries.eu/rest/v2/alpha/' + countryCode).then(response => {
                let countryName = response.data.name

                sessionStorage.setItem('ncovindia_usersCountry', countryName)   //Setting User's Country Name to Session Storage

            }).catch(error => console.log(error.message))

        }).catch(error => console.log(error.message))

        //Fetching India's Confirmed for updating the cases in India with our API in the world list
        axios.get('https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise').then(response => {
            let data = response.data.data
            let indiaConfirmed = data.total.confirmed

            this.setState({ indiaConfirmed: indiaConfirmed })

        }).catch(error => console.log(error.message))

        //Updating India Data in the list
        let url1 = "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
        axios.get(url1).then(response => {
            var data = response.data.data

            let conf = data.total.confirmed
            let rec = data.total.recovered
            let death = data.total.deaths
            let act = data.total.active

            let stat = {
                confirmed: conf,
                recovered: rec,
                deaths: death,
                active: act
            }
            this.setState({ indiaStat: stat })
        }).catch(error => console.log(error.message))


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
                <ScrollMemory />        {/*Used to Restore Scroll */}
                <Switch>
                    <Route exact path='/' component={App}></Route>
                    <Route exact path='/about-corona' component={AboutCorona}></Route>
                    <Route exact path='/corona-patients-in-world'><WorldData worldPatientsData={this.state.worldPatientsData}
                        indiaStat={this.state.indiaConfirmed} /> </Route>
                    {/* <Route exact path='/china-data'><CountryData country={"china"} countryStateData={this.state} /></Route>
                    <Route exact path='/spain-data'><CountryData country={"spain"} countryStateData={this.state} /></Route>
                    <Route exact path='/italy-data'><CountryData country={"italy"} countryStateData={this.state} /></Route> */}
                    <Route path='/world-data/:countryname' component={CountryData}></Route>
                    <Route path='/donate'><Donate /></Route>
                    <Route component={Error404}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Routing
