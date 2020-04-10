import React, { Component, Fragment } from 'react'
import axios from 'axios'
import '../css/world.css'
import Loader from './Loader'


export class WorldCase extends Component {
    constructor(props) {
        super(props)

        this.state = {
            worldStats: {},
            lastUpdated: ''
        }
    }

    componentDidMount() {
        let url = 'https://api.coronastatistics.live/all'
        axios.get(url).then(resposne => {
            let data = resposne.data

            let dt = new Date(data.updated)
            let prevHr = dt.getHours()
            let prevMin = dt.getMinutes()

            let currDate = new Date()
            let currHr = currDate.getHours()
            let currMin = currDate.getMinutes()

            if ((currHr - prevHr === 0) && (currMin - prevMin >= 0)) {
                let uptime = Math.abs(currMin - prevMin)
                if (uptime === 1) {
                    let lastval = uptime + ' Minute'
                    this.setState({ lastUpdated: lastval })
                } else {
                    let lastval = uptime + ' Minutes'
                    this.setState({ lastUpdated: lastval })
                }

            }
            else if ((currHr - prevHr !== 0) && (currMin < prevMin)) {
                let uptime = 60 - Math.abs(currMin - prevMin)
                if (uptime === 1) {
                    let lastval = uptime + ' Minute'
                    this.setState({ lastUpdated: lastval })
                } else {
                    let lastval = uptime + ' Minutes'
                    this.setState({ lastUpdated: lastval })
                }
                this.setState({ lastUpdated: uptime })
            } else {
                let uptime = Math.abs(currHr - prevHr)
                if (uptime === 1) {
                    let lastval = uptime + ' Hour'
                    this.setState({ lastUpdated: lastval })
                } else {
                    let lastval = 'About ' + uptime + ' Hours'
                    this.setState({ lastUpdated: lastval })
                }
                // this.setState({ lastUpdated: uptime })
            }

            this.setState({ worldStats: data })
        }).catch(error => console.log(error.message))
    }

    render() {
        return (
            <div className='world-cases' style={{
                background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#262626' : '#fff'}`,
                color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#fff' : '#222'}`
            }}>
                <div className='wc-container'>
                    <div className='last-updated-wc'
                        style={{ color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? 'skyblue' : 'red'}` }}>
                        <span>Last Updated {this.state.lastUpdated} Ago</span>
                    </div>
                    <div className='world-cases-main'
                        style={{ border: ` 0.5px solid ${localStorage.getItem('ncovindia_isDark') === 'true' ? '#1c1c1c' : '#eee'}` }}>

                        <div className='world-case-cont' style={{ background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#323a46' : '#fff'}` }}>
                            <div className='wc-title'><span>Infected</span></div>

                            {
                                this.state.worldStats.cases === undefined ? <Loader /> :
                                    <Fragment>
                                        <div className="wc-rate"><span style={{ background: 'rgb(1, 176, 230)' }}>
                                            <span className="material-icons wc-rate" style={{ fontSize: 10 }}>
                                                trending_up</span></span>
                                        </div>
                                        <div className='wc-case-count'>
                                            <span>{this.props.countryStat.confirmed !== undefined ?
                                                this.props.countryStat.confirmed.toLocaleString('en-IN')
                                                : this.state.worldStats.cases.toLocaleString('en-IN')}</span>
                                        </div>
                                    </Fragment>

                            }

                            <div className='wc-hr'><hr style={{ background: 'rgb(1, 176, 230)' }} /></div>
                        </div>
                        <div className='world-case-cont ' style={{ background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#323a46' : '#fff'}` }}>
                            <div className='wc-title'><span>Recovered</span></div>

                            {
                                this.state.worldStats.cases === undefined ? <Loader /> :
                                    <Fragment>
                                        <div className="wc-rate">
                                            <span style={{ background: 'rgb(42, 180, 7)' }}>
                                                <span className="material-icons wc-rate" style={{ fontSize: 10 }}>
                                                    trending_up</span>{this.props.countryStat !== undefined ? this.props.countryStat.recoveryRate :
                                                    ((this.state.worldStats.recovered / this.state.worldStats.cases) * 100).toPrecision(3) + "%"}</span>
                                        </div>
                                        <div className='wc-case-count'>
                                            <span>{this.props.countryStat !== undefined ?
                                                this.props.countryStat.recovered.toLocaleString('en-IN')
                                                : this.state.worldStats.recovered.toLocaleString('en-IN')}</span>
                                        </div>
                                    </Fragment>

                            }
                            <div className='wc-hr'><hr style={{ background: 'rgb(42, 180, 7)' }} /></div>
                        </div>
                        <div className='world-case-cont' style={{ background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#323a46' : '#fff'}` }}>
                            <div className='wc-title'><span>Deaths</span></div>

                            {
                                this.state.worldStats.cases === undefined ? <Loader /> :
                                    <Fragment>
                                        <div className="wc-rate"><span style={{ background: 'rgb(255, 0, 0)' }}>
                                            <span className="material-icons wc-rate" style={{ fontSize: 10 }}>
                                                trending_up</span>{this.props.countryStat !== undefined ? this.props.countryStat.deathRate :
                                                ((this.state.worldStats.deaths / this.state.worldStats.cases) * 100).toPrecision(3) + "%"}</span>
                                        </div>
                                        <div className='wc-case-count'>
                                            <span>{this.props.countryStat !== undefined ?
                                                this.props.countryStat.deaths.toLocaleString('en-IN')
                                                : this.state.worldStats.deaths.toLocaleString('en-IN')}</span>
                                        </div>
                                    </Fragment>

                            }
                            <div className='wc-hr'><hr style={{ background: 'rgb(255, 0, 0)' }} /></div>
                        </div>
                        <div className='world-case-cont' style={{ background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#323a46' : '#fff'}` }}>
                            <div className='wc-title'><span>Active</span></div>

                            {
                                this.state.worldStats.cases === undefined ? <Loader /> :
                                    <Fragment>
                                        <div className="wc-rate"><span style={{ background: "rgb(196, 4, 221)" }}>
                                            <span className="material-icons wc-rate" style={{ fontSize: 10 }}>
                                                trending_up</span>{this.props.countryStat !== undefined ? this.props.countryStat.activeRate :
                                                (((this.state.worldStats.cases - (this.state.worldStats.deaths +
                                                    this.state.worldStats.recovered)) /
                                                    this.state.worldStats.cases) * 100).toPrecision(3) + "%"}</span>
                                        </div>
                                        <div className='wc-case-count'>
                                            <span>{this.props.countryStat !== undefined ?
                                                this.props.countryStat.active.toLocaleString('en-IN')
                                                : (this.state.worldStats.cases - (this.state.worldStats.deaths + this.state.worldStats.recovered)).toLocaleString('en-IN')}
                                            </span>
                                        </div>
                                    </Fragment>

                            }
                            <div className='wc-hr'><hr style={{ background: "rgb(196, 4, 221)" }} /></div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default WorldCase
