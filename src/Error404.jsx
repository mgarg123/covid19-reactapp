import React, { Component } from 'react'
import CountUp from 'react-countup'
import '../src/css/error.css'
import { Link } from 'react-router-dom'
export class Error404 extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div class="error404">
                <h1><CountUp start={0} end={4} duration={1} />0<CountUp start={0} end={4} duration={2} /></h1>
                <p>Oops! Something is wrong.</p>
                <Link class="button" to="/"><i className="fa fa-home"></i> Go back in initial page, is better.</Link>
            </div>
        )
    }
}

export default Error404
