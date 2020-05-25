import React, { Component, Fragment } from 'react'
import CaseBox from './CaseBox'
import '../css/index.css'
import StatewiseMap from './StatewiseMap'
import SamplesTested from './SamplesTested'
import TopFiveStates from './TopFiveStates'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import { Translation } from 'react-i18next'
import { connect } from 'react-redux'

export class CaseNumber extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lastUpdatedTime: ""
        }
    }

    componentDidMount() {
        // this.props.history.push('/stats')
        // window.location = "/"

    }


    render() {
        return (
            <Fragment>
                <div className="main-cont">

                    <div className="current-number-container">


                        <div className="user-location" style={{
                            display: `${window.screen.width < 768 ? 'block' : 'none'}`,
                            textAlign: 'center',
                            marginBottom: '15px',
                            fontSize: '12.5px',
                            marginTop: '-10px'
                        }}>
                            {
                                this.props.location.state !== "" ? <span style={{
                                    color: `${this.props.isDark ? 'lightgreen' : 'green'}`,
                                    textTransform: 'uppercase'
                                }}>
                                    <Translation>
                                        {t => t('You Visited From')}
                                    </Translation>
                                    <b> {this.props.location.district + ", " +
                                        this.props.location.state + ", " +
                                        this.props.location.country + "."}</b>
                                    <Link to={`/state-data/${this.props.location.state}`} style={{
                                        borderBottom: '0.5px solid grey',
                                        // fontSize: '15px',
                                        fontWeight: 'bold',
                                        color: `${this.props.isDark ? 'orange' : 'red'}`
                                    }}>
                                        <Translation>
                                            {t =>
                                                t('VIEW STATUS')}
                                        </Translation>
                                        .</Link>
                                </span> :
                                    <Loader />
                            }
                        </div>


                        <div className='last-updated-at' style={{
                            color: `${this.props.isDark ? 'skyblue' : 'red'}`,
                            fontSize: '13px'
                        }}>
                            <Translation>
                                {t => <span>
                                    {t('Last Updated') + " "}
                                    {this.props.lastUpdated.includes('Hours') && t('About') + " "}
                                    {this.props.lastUpdated.includes("Hours") ?
                                        this.props.lastUpdated.split(" ")[1] + " " + t("Hours") + " " :
                                        this.props.lastUpdated.split(" ")[0] + " " + t("Minutes") + " "} {t('Ago')}
                                </span>
                                }
                            </Translation>
                            {/* <span>Last Updated {this.props.lastUpdated} Ago</span> */}
                        </div>
                        <div className="current-cont">
                            <CaseBox title={"Infected"}
                                bgColor={"rgb(1, 176, 230)"}
                                val={this.props.stats.confirmed}
                                conf={this.props.stats.confirmed}
                                todayDelta={this.props.keyVals.deltaconfirmed}
                                cls={'conf-no'}         //For Animating
                                isDark={this.props.isDark} />
                            <CaseBox title={"Recovered"}
                                bgColor={"rgb(42, 180, 7)"}
                                val={this.props.stats.recovered}
                                conf={this.props.stats.confirmed}
                                cls={'rec-no'}
                                todayDelta={this.props.keyVals.deltarecovered}
                                isDark={this.props.isDark} />
                            <CaseBox title={"Deaths"}
                                bgColor={"rgb(255, 0, 0)"}
                                val={this.props.stats.deaths}
                                conf={this.props.stats.confirmed}
                                todayDelta={this.props.keyVals.deltadeaths}
                                cls={'dth-no'}
                                isDark={this.props.isDark} />
                            <CaseBox title={"Active"}
                                bgColor={"rgb(196, 4, 221)"}
                                val={this.props.stats.active}
                                conf={this.props.stats.confirmed}
                                cls={'act-no'}
                                isDark={this.props.isDark} />
                        </div>
                        <div className="sample-tf-cont">
                            <SamplesTested isDark={this.props.isDark} />
                            <TopFiveStates isDark={this.props.isDark} />
                        </div>

                    </div>


                    <div className="map-and-tf-container" >
                        <StatewiseMap isDark={this.props.isDark} />
                    </div>

                </div>

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.users.location
    }
}

export default connect(mapStateToProps, null)(CaseNumber)
