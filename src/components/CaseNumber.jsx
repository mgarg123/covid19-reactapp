import React, { Component, Fragment } from 'react'
import CaseBox from './CaseBox'
import '../css/index.css'
import StatewiseMap from './StatewiseMap'

export class CaseNumber extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <Fragment>
                <div className="main-cont">
                    {/* <Header /> */}
                    <div className="current-number-container">
                        <CaseBox title={"Infected"}
                            bgColor={"rgb(1, 176, 230)"}
                            val={this.props.stats.confirmed}
                            conf={this.props.stats.confirmed}
                            todayDelta={this.props.keyVals.confirmeddelta}
                            isDark={this.props.isDark} />
                        <CaseBox title={"Recovered"}
                            bgColor={"rgb(42, 180, 7)"}
                            val={this.props.stats.recovered}
                            conf={this.props.stats.confirmed}
                            todayDelta={this.props.keyVals.recovereddelta}
                            isDark={this.props.isDark} />
                        <CaseBox title={"Deaths"}
                            bgColor={"rgb(255, 0, 0)"}
                            val={this.props.stats.deaths}
                            conf={this.props.stats.confirmed}
                            todayDelta={this.props.keyVals.deceaseddelta}
                            isDark={this.props.isDark} />
                        <CaseBox title={"Active"}
                            bgColor={"rgb(196, 4, 221)"}
                            val={this.props.stats.active}
                            conf={this.props.stats.confirmed}
                            isDark={this.props.isDark} />
                    </div>
                    <StatewiseMap isDark={this.props.isDark} />
                </div>

            </Fragment>
        )
    }
}

export default CaseNumber
