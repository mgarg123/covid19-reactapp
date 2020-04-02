import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import App from './App'
import Error404 from './Error404'

export class Routing extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={App}></Route>
                    <Route exact path='/about-corona'></Route>
                    <Route component={Error404}></Route>
                </Switch>
            </Router>
        )
    }
}

export default Routing
