import React, { Component } from 'react'
import IndiaSvg from './IndiaSvg'
import '../css/plot.css'
import StateDetailsCont from './StateDetailsCont'

export class StatewiseMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stateName: "MAHARASHTRA",
            stateData: [],
            affectedState: 0
        }
    }

    callBackFun = (state) => {
        this.setState({ stateName: state })
    }
    stateDataCall = (stData, affectState) => {
        this.setState({ stateData: stData, affectedState: affectState })
    }

    render() {
        return (
            <div className="plot-cont">
                <div className="plot-cont-heading">
                    <span>Statewise Statistics</span>
                </div>
                <StateDetailsCont stateName={this.state.stateName} stateDataCallBack={this.stateDataCall} isDark={this.props.isDark} />
                <div className="map-container">
                    <IndiaSvg callBack={this.callBackFun} isDark={this.props.isDark} />
                </div>
                {/* <AgeGroupChart isDark={this.props.isDark} /> */}


            </div>

        )
    }
}

export default StatewiseMap
