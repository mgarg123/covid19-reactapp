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
import CompareRecords from './components/CompareRecords'
import StatesDashboard from './components/StatesDashboard'
// import store from '../src/components/redux/store'
// import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { usersLocation } from './components/redux/usersReducer'


// const WorldData = lazy(() => import('../src/components/WorldData'))


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
            indiaConfirmed: '',
            userLocation: {}
        }
    }

    componentDidMount() {
        //Initializing Google Analytics
        ReactGA.initialize('UA-155988779-1')

        //Fetching India's Confirmed for updating the cases in India with our API in the world list
        axios.get('https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise').then(response => {
            let data = response.data.data
            let indiaConfirmed = data.total.confirmed

            this.setState({ indiaConfirmed: indiaConfirmed })

        }).catch(error => console.log(error.message))


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log(position.coords.latitude + " " + position.coords.longitude);
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude

                let url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" + latitude + "&longitude=" + longitude + "&localityLanguage=en"
                axios.get(url).then(response => {
                    let data = response.data
                    // console.log(data);
                    let countryName = data.countryName
                    let stateName = data.principalSubdivision
                    let districtName = data.localityInfo["administrative"][2].name.split(" ")[0]
                    // alert(stateName + " " + districtName)

                    localStorage.setItem('ncovindia_usersCountry', countryName)
                    localStorage.setItem('ncovindia_usersState', stateName)   //Setting User's State Name to Local Storage
                    localStorage.setItem('ncovindia_usersCity', districtName)   //Setting User's City Name to Local Storage

                    //Setting location values to Redux State
                    this.props.usersLocation({
                        country: countryName,
                        state: stateName,
                        district: districtName
                    })
                    // this.setState({ userCountry: countryName })
                })
            }, (error) => {
                // alert(error.message)
                if (error.code === error.PERMISSION_DENIED) {
                    //IP to Country and State Name
                    axios.get('https://ipapi.co/json').then(response => {
                        let data = response.data
                        let countryName = data.country_name
                        let stateName = data.region
                        let cityName = data.city

                        localStorage.setItem('ncovindia_usersCountry', countryName)   //Setting User's Country Name to Local Storage
                        localStorage.setItem('ncovindia_usersState', stateName)   //Setting User's State Name to Local Storage
                        localStorage.setItem('ncovindia_usersCity', cityName)   //Setting User's City Name to Local Storage
                        //Setting location values to Redux State
                        this.props.usersLocation({
                            country: countryName,
                            state: stateName,
                            district: cityName
                        })
                        // this.setState({ userCountry: countryName })

                    }).catch(error => console.log(error.message));

                }
            })
        }



        let url = "https://pomber.github.io/covid19/timeseries.json"

        // var currentURL = window.location.href;

        axios.get(url).then(response => {
            let data = response.data
            var worldData = data;

            this.setState({
                worldPatientsData: worldData
            })

        }).catch(error => console.log(error.message))
    }


    render() {
        //console.log('from routing');
        //console.log(this.state.worldData);
        return (

            <Router>
                <ScrollMemory />        {/*Used to Restore Scroll */}
                <Switch>
                    <Route exact path='/'
                        render={(props) => <App />}
                    >
                    </Route>     {/* Use render props in react router to pass props down the comp.*/}
                    <Route exact path='/about-corona' component={AboutCorona}></Route>
                    <Route exact path='/corona-patients-in-world'><WorldData worldPatientsData={this.state.worldPatientsData}
                        indiaStat={this.state.indiaConfirmed} /> </Route>
                    {/* <Route exact path='/china-data'><CountryData country={"china"} countryStateData={this.state} /></Route>
                    <Route exact path='/spain-data'><CountryData country={"spain"} countryStateData={this.state} /></Route>
                    <Route exact path='/italy-data'><CountryData country={"italy"} countryStateData={this.state} /></Route> */}
                    <Route path='/world-data/:countryname' component={CountryData}></Route>
                    <Route path='/compare-corona-records-of-different-countries'
                        render={(props) => <CompareRecords data={this.state.worldPatientsData} />}></Route>
                    <Route path='/donate'><Donate /></Route>
                    <Route path='/state-data/:statename' component={StatesDashboard}></Route>
                    <Route component={Error404}></Route>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.users.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        usersLocation: location => dispatch(usersLocation(location))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Routing)
