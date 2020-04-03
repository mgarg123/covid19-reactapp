import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import App from './App'
import Error404 from './Error404'
import AboutCorona from '../src/components/AboutCorona'
import CountryData from '../src/components/CountryData'

export class Routing extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={App}></Route>
                    <Route exact path='/about-corona' component={AboutCorona}></Route>
                    <Route exact path='/china-data'><CountryData country={"china"} /></Route>
                    <Route exact path='/spain-data'><CountryData country={"spain"} /></Route>
                    <Route exact path='/italy-data'><CountryData country={"italy"} /></Route>
                    <Route component={Error404}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Routing
