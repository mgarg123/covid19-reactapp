import React, { Component, Fragment } from 'react'
import CaseBox from './CaseBox'
import '../css/index.css'
import StatewiseMap from './StatewiseMap'
import SamplesTested from './SamplesTested'
import TopFiveStates from './TopFiveStates'

export class CaseNumber extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lastUpdatedTime: ""
        }
    }

    componentDidMount() {
        // this.props.history.push('/stats')
    }


    render() {
        return (
            <Fragment>
                <div className="main-cont">
                    <div className="left">
                        <div className="current-number-container">
                            <div className='last-updated-at' style={{
                                color: `${this.props.isDark ? 'skyblue' : 'red'}`,
                                fontSize: '13px'
                            }}><span>Last Updated {this.props.lastUpdated} Ago</span></div>
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
                        </div>
                        <div className="">
                            <SamplesTested isDark={localStorage.getItem('ncovindia_isDark') === 'true'} />
                            <TopFiveStates />
                        </div>
                    </div>
                    <div class="right">
                        <div className="map-and-tf-container" style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                            <StatewiseMap isDark={this.props.isDark} />
                        </div>
                    </div>

                </div>

            </Fragment>
        )
    }
}

export default CaseNumber
