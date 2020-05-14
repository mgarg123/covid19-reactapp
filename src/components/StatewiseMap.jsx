import React, { Component } from 'react'
import IndiaSvg from './IndiaSvg'
import '../css/plot.css'
import StateDetailsCont from './StateDetailsCont'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { connect } from 'react-redux'
import { Translation } from 'react-i18next'

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
                {
                    this.props.location.state !== "" ?
                        <div className="user-location" style={{
                            display: `${window.screen.width < 768 ? 'none' : 'block'}`,
                            textAlign: 'left',
                            marginBottom: '15px',
                            marginTop: '3px'
                        }}>
                            <Translation>
                                {t => <span style={{
                                    color: `${this.props.isDark ? 'lightgreen' : 'green'}`,
                                    textTransform: 'uppercase'
                                }}>{t('You Visited From') + " "}
                                    <b style={{ letterSpacing: '0.5px' }}>{this.props.location.district + ", " +
                                        this.props.location.state && this.props.location.state + ", " +
                                        this.props.location.country + "."}</b>
                                    <Link to={`/state-data/${this.props.location.state}`} style={{
                                        borderBottom: '0.5px solid grey',
                                        // fontSize: '15px',
                                        fontWeight: 'bold',
                                        color: `${this.props.isDark ? 'orange' : 'red'}`
                                    }}>
                                        {
                                            t('VIEW STATUS')}
                                        .</Link>
                                </span>}
                            </Translation>

                        </div> :
                        <Loader />
                }
                <div className="plot-cont-main" >
                    <div className="plot-cont-heading">
                        <span>
                            <Translation>
                                {t => t("Statewise Statistics")}
                            </Translation>
                        </span>
                    </div>
                    <StateDetailsCont stateName={this.state.stateName} stateDataCallBack={this.stateDataCall} isDark={this.props.isDark} />
                    <div className="map-container">
                        <IndiaSvg callBack={this.callBackFun} isDark={this.props.isDark} />
                    </div>
                </div>

                {/* <AgeGroupChart isDark={this.props.isDark} /> */}


            </div >

        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.users.location
    }
}
export default connect(mapStateToProps, null)(StatewiseMap)
