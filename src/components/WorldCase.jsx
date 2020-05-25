import React, { Component, Fragment } from 'react'
import axios from 'axios'
import '../css/world.css'
import Loader from './Loader'
import { Translation } from 'react-i18next'


export class WorldCase extends Component {
    constructor(props) {
        super(props)

        this.state = {
            worldStats: {},
            lastUpdated: '',
            todayDelta: {}
        }
    }

    componentDidMount() {
        let url = "https://covidstat.info/graphql"
        axios({
            url: url,
            method: "post",
            data: {
                query: `{
                    all{
                        cases
                        deaths
                        recovered
                        todayCases
                        todayDeaths
                        active
                        updated
                    }
                }`
            }
        }).then(res => {
            let data = res.data.data
            // console.log(data.all);
            let lastUpdated = new Date(data.all.updated)
            let lastUpTime = [lastUpdated.getHours(), lastUpdated.getMinutes(), lastUpdated.getSeconds()]
            let time = new Date()
            let currHour = time.getHours()
            let currMin = time.getMinutes()

            if ((currHour - parseInt(lastUpTime[0]) === 0) && (currMin - parseInt(lastUpTime[1]) >= 0)) {
                let updatedTime = Math.abs(currMin - parseInt(lastUpTime[1])) + " Minutes"
                this.setState({ lastUpdated: updatedTime })
            }
            else if ((currHour - parseInt(lastUpTime[0]) !== 0) && (currMin < parseInt(lastUpTime[1]))) {
                let updatedTime = 60 - Math.abs(currMin - parseInt(lastUpTime[1])) + " Minutes"
                this.setState({ lastUpdated: updatedTime })
            } else {
                let updatedTime = "About " + Math.abs(currHour - parseInt(lastUpTime[0])) + " Hours"
                this.setState({ lastUpdated: updatedTime })
            }


            this.setState({ worldStats: data.all })
        }).catch(err => console.log(err.message))


        //     // let url = 'https://api.coronastatistics.live/all'
        //     axios.get(url).then(resposne => {
        //         let data = resposne.data

        //         let dt = new Date(data.updated)
        //         let prevHr = dt.getHours()
        //         let prevMin = dt.getMinutes()

        //         let currDate = new Date()
        //         let currHr = currDate.getHours()
        //         let currMin = currDate.getMinutes()

        //         if ((currHr - prevHr === 0) && (currMin - prevMin >= 0)) {
        //             let uptime = Math.abs(currMin - prevMin)
        //             if (uptime === 1) {
        //                 let lastval = uptime + ' Minute'
        //                 this.setState({ lastUpdated: lastval })
        //             } else {
        //                 let lastval = uptime + ' Minutes'
        //                 this.setState({ lastUpdated: lastval })
        //             }

        //         }
        //         else if ((currHr - prevHr !== 0) && (currMin < prevMin)) {
        //             let uptime = 60 - Math.abs(currMin - prevMin)
        //             if (uptime === 1) {
        //                 let lastval = uptime + ' Minute'
        //                 this.setState({ lastUpdated: lastval })
        //             } else {
        //                 let lastval = uptime + ' Minutes'
        //                 this.setState({ lastUpdated: lastval })
        //             }
        //             this.setState({ lastUpdated: uptime })
        //         } else {
        //             let uptime = Math.abs(currHr - prevHr)
        //             if (uptime === 1) {
        //                 let lastval = uptime + ' Hour'
        //                 this.setState({ lastUpdated: lastval })
        //             } else {
        //                 let lastval = 'About ' + uptime + ' Hours'
        //                 this.setState({ lastUpdated: lastval })
        //             }
        //             // this.setState({ lastUpdated: uptime })
        //         }

        //         this.setState({ worldStats: data })
        //     }).catch(error => console.log(error.message));

        //     axios.get("https://api.covid19api.com/summary").then(response => {
        //         let data = response.data
        //         let obj = {
        //             todayConfirmed: data.Global.NewConfirmed,
        //             todayDeaths: data.Global.NewDeaths,
        //             todayRecovered: data.Global.NewRecovered,
        //         }
        //         this.setState({ todayDelta: obj })

        //     }).catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className='world-cases' style={{
                background: `${this.props.isDark ? '#262626' : '#fff'}`,
                color: `${this.props.isDark ? '#fff' : '#222'}`
            }}>
                <div className='wc-container'>
                    <Translation>
                        {t => <div className='last-updated-wc'
                            style={{ color: `${this.props.isDark ? 'skyblue' : 'red'}` }}>
                            <span>{t("Last Updated") + " "}
                                {this.state.lastUpdated.includes("About") && " " + t("About") + " "}
                                {this.state.lastUpdated.includes("Hours") ?
                                    this.state.lastUpdated.split(" ")[1] + " " + t("Hours") + " " :
                                    this.state.lastUpdated.split(" ")[0] + " " + t("Minutes") + " "} {t('Ago')}</span>
                        </div>}
                    </Translation>

                    <div className='world-cases-main'
                        style={{ border: ` 0.5px solid ${this.props.isDark ? '#1c1c1c' : '#eee'}` }}>

                        <div className='world-case-cont' style={{ background: `${this.props.isDark ? '#262529' : '#fff'}` }}>
                            <div className='wc-title'>
                                <span>
                                    <Translation>{(t) => t('Infected')}</Translation>
                                </span>
                            </div>

                            {
                                this.state.worldStats.cases === undefined ? <Loader /> :
                                    <Fragment>
                                        <div className="wc-rate"><span style={{ background: 'rgb(1, 176, 230)' }}>
                                            <span className="material-icons wc-rate" style={{ fontSize: 10 }}>
                                                trending_up</span></span>
                                        </div>
                                        <div className='wc-case-count'>
                                            <span>{this.props.countryStat ?
                                                this.props.countryStat.confirmed.toLocaleString('en-IN')
                                                : this.state.worldStats.cases.toLocaleString('en-IN')}</span>
                                        </div>
                                        <Translation>
                                            {t => <div className="today-delta"
                                                style={{
                                                    color: `${this.props.isDark ? 'rgb(125, 221, 189)' : 'rgb(34, 143, 106)'}`,
                                                    padding: '20px 0px 20px 0px'
                                                }}
                                            >{`${this.props.todayStats !== undefined ? "+" + this.props.todayStats.todayConfirmed.toLocaleString('en-IN') + " " + t("today") :
                                                this.state.worldStats.todayCases !== undefined ? '+' + (this.state.worldStats.todayCases.toLocaleString('en-IN')) + ' today' : ''}`}
                                            </div>}
                                        </Translation>

                                    </Fragment>

                            }

                            <div className='wc-hr'><hr style={{ background: 'rgb(1, 176, 230)' }} /></div>
                        </div>
                        <div className='world-case-cont ' style={{ background: `${this.props.isDark ? '#262529' : '#fff'}` }}>
                            <div className='wc-title'>
                                <span>
                                    <Translation>{(t) => t('Recovered')}</Translation>
                                </span>
                            </div>

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
                                        <div className="today-delta"
                                            style={{
                                                color: `${this.props.isDark ? 'rgb(125, 221, 189)' : 'rgb(34, 143, 106)'}`,
                                                padding: '20px 0px 20px 0px'
                                            }}
                                        >{`${this.props.todayStats !== undefined ? '' :
                                            this.state.todayDelta.todayRecovered !== undefined ? '+' + (this.state.todayDelta.todayRecovered.toLocaleString('en-IN')) + ' today' : ''}`}
                                        </div>
                                    </Fragment>

                            }
                            <div className='wc-hr'><hr style={{ background: 'rgb(42, 180, 7)' }} /></div>
                        </div>
                        <div className='world-case-cont' style={{ background: `${this.props.isDark ? '#262529' : '#fff'}` }}>
                            <div className='wc-title'>
                                <span>
                                    <Translation>{(t) => t('Deaths')}</Translation>
                                </span>
                            </div>

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
                                        <Translation>
                                            {t => <div className="today-delta"
                                                style={{
                                                    color: `${this.props.isDark ? 'rgb(125, 221, 189)' : 'rgb(34, 143, 106)'}`,
                                                    padding: '20px 0px 20px 0px'
                                                }}
                                            >{`${this.props.todayStats !== undefined ? "+" + this.props.todayStats.todayDeaths.toLocaleString('en-IN') + " " + t("today") :
                                                this.state.worldStats.todayDeaths !== undefined ? '+' + (this.state.worldStats.todayDeaths.toLocaleString('en-IN')) + ' today' : ''}`}
                                            </div>}
                                        </Translation>

                                    </Fragment>

                            }
                            <div className='wc-hr'><hr style={{ background: 'rgb(255, 0, 0)' }} /></div>
                        </div>
                        <div className='world-case-cont' style={{ background: `${this.props.isDark ? '#262529' : '#fff'}` }}>
                            <div className='wc-title'>
                                <span>
                                    <Translation>{(t) => t('Active')}</Translation>
                                </span>
                            </div>

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
                                        <div className="today-delta"
                                            style={{
                                                color: `${this.props.isDark ? 'rgb(125, 221, 189)' : 'rgb(34, 143, 106)'}`,
                                                padding: '20px 0px 20px 0px',
                                            }}
                                        >{''}
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
