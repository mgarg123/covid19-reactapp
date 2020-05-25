import React, { Component, Fragment } from 'react'
import '../css/table.css'
import { connect } from 'react-redux'
import { Translation } from 'react-i18next'
import { Link } from 'react-router-dom'

export class StateTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stateData: props.stateData,
            stateDataMain: props.stateData,         //For Filtering States
            // sortState: false,
            sortConfirmed: true,
            sortRecovered: false,
            sortDeaths: false,
            sortActive: false,
            clickedState: "",
            isDistrictOpen: false,
            sortDistrictConf: false,
            sortDistrictRec: false,
            sortDistrictDth: false,
            stateSearchVal: "",
            districtData: props.districtDatas,
            // zoneData: JSON.parse(localStorage.getItem('ncovindia_zoneDataV2'))
        }
    }

    componentDidMount() {
        // window.location = "lists"
    }

    componentDidUpdate(prevProps, prevState) {
        // if (this.state.sortState !== prevState.sortState) {
        //     if (this.state.sortState === true) {
        //         let arr = this.state.stateData
        //         arr.sort((x, y) => x.state > y.state ? 1 : x.state < y.state ? -1 : 0)
        //         //Timeout is used to delay the process as it was giving unknown result
        //         setTimeout(() => {
        //             this.setState({ stateData: arr })
        //         }, 50)

        //     } else {
        //         let arr = [...this.state.stateData]
        //         arr.sort((x, y) => x.state < y.state ? 1 : x.state > y.state ? -1 : 0)
        //         this.setState({ stateData: arr })
        //     }
        // }
        if (this.state.sortConfirmed !== prevState.sortConfirmed) {
            if (this.state.sortConfirmed === true) {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => y.confirmed - x.confirmed)
                this.setState({ stateData: arr })
            } else {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => x.confirmed - y.confirmed)
                this.setState({ stateData: arr })
            }
        }
        if (this.state.sortRecovered !== prevState.sortRecovered) {
            if (this.state.sortRecovered !== true) {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => y.recovered - x.recovered)
                this.setState({ stateData: arr })
            } else {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => x.recovered - y.recovered)
                this.setState({ stateData: arr })
            }
        }
        if (this.state.sortDeaths !== prevState.sortDeaths) {
            if (this.state.sortDeaths !== true) {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => y.deaths - x.deaths)
                this.setState({ stateData: arr })
            } else {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => x.deaths - y.deaths)
                this.setState({ stateData: arr })
            }
        }
        if (this.state.sortActive !== prevState.sortActive) {
            if (this.state.sortActive !== true) {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => y.active - x.active)
                this.setState({ stateData: arr })
            } else {
                let arr = [...this.state.stateData]
                arr.sort((x, y) => x.active - y.active)
                this.setState({ stateData: arr })
            }
        }

        if (this.state.clickedState !== prevState.clickedState) {
            if (prevState.clickedState !== "") {
                if (document.getElementById("data-" + prevState.clickedState) !== null)
                    document.getElementById("data-" + prevState.clickedState).style.display = "none"
            }

            if (this.state.clickedState !== prevState.clickedState && this.state.isDistrictOpen === false) {
                document.getElementById("data-" + prevState.clickedState).style.display = "none"
                document.getElementById("data-" + this.state.clickedState).style.display = "table-row"
                this.setState({ isDistrictOpen: true })
            }


        }
        if (this.state.isDistrictOpen !== prevState.isDistrictOpen) {
            if (document.getElementById("data-" + this.state.clickedState) !== null) {
                if (this.state.isDistrictOpen === true) {
                    document.getElementById("data-" + this.state.clickedState).style.display = "table-row"
                } else {
                    document.getElementById("data-" + prevState.clickedState).style.display = "none"
                }
            }

        }

        //State Search Logic
        if (this.state.stateSearchVal !== prevState.stateSearchVal) {
            // let distArry = []
            // let dist = this.state.districtData.map(x => x.districtData)
            // for (let i = 0; i < dist.length; i++) {
            //     for (let j = 0; j < dist[i].length; j++) {
            //         distArry.push(dist[i][j])
            //     }
            // }
            // console.log(distArry);
            let mainData = [...this.state.stateDataMain]
            let arr = mainData.filter(x => x.state.toLowerCase().includes(this.state.stateSearchVal.toLowerCase()))
            this.setState({ stateData: arr })
        }

    }

    render() {
        return (
            <div className="state-table-container">
                <div className="state-table-header">
                    <div className='search-country' style={{
                        width: '100%',
                        margin: '20px 0px 0px 0px'
                    }}>
                        <div style={{ width: 'fit-content', margin: '0 auto' }}>
                            <Translation>
                                {t => <input type="text"
                                    value={this.state.countrySearchVal}
                                    placeholder={t('Search State or UT')}
                                    name="countryname"
                                    id="countryname"
                                    style={{
                                        width: '250px',
                                        height: '35px',
                                        padding: '8px 8px',
                                        border: 'none',
                                        boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.8' : '0.4'})`,
                                        borderRadius: '4px',
                                        fontSize: '17px'
                                    }}
                                    onChange={(event) => this.setState({ stateSearchVal: event.target.value })}
                                />}
                            </Translation>

                        </div>

                    </div >
                    <div className="affectedDiv" >
                        <span>{this.props.affectedState + " "}
                            <Translation>
                                {t => t('STATES/UT AFFECTED')}
                            </Translation>
                        </span>
                    </div><div className="feature-notice" style={{ fontSize: '10px', textAlign: 'center', marginTop: '10px' }} >
                        <span>*  <Translation>
                            {t => t('Click on the states to see affected districts')}
                        </Translation></span>
                    </div>
                </div >
                {/* <StateTable stateData={this.state.stateData} isDark={this.props.isDark} /> */}
                < div className="all-table-cont" >
                    <div className="table-container">
                        <table className="state-table">
                            <thead style={{
                                background: `${this.props.isDark ? 'rgb(50, 58, 70)' : 'rgb(208, 206, 206)'}`,
                                fontWeight: 'bold',
                                position: 'sticky',
                                top: '0',
                                left: '0'
                            }}>
                                <Translation>
                                    {
                                        t => <tr>
                                            <th style={{
                                                // background: `${this.props.isDark ? '#262626' : '#fff'}`,
                                                height: '32px'
                                            }}></th>
                                            <th onClick={() => this.setState({
                                                // sortState: !this.state.sortState,
                                                sortConfirmed: false,
                                                sortActive: false,
                                                sortDeaths: false,
                                                sortRecovered: false
                                            })}
                                            >
                                                {t('STATE/UT')}

                                                {/* <span class="material-icons" style={{ fontSize: '11px' }}>
                                    {this.state.sortState ? 'arrow_downward' : 'arrow_upward'}
                                </span> */}
                                            </th>
                                            <th onClick={() => this.setState({
                                                sortState: false,
                                                sortConfirmed: !this.state.sortConfirmed,
                                                sortActive: false,
                                                sortDeaths: false,
                                                sortRecovered: false
                                            })}><span>
                                                    {t('INFCTD')}
                                                    <span className="material-icons" style={{
                                                        fontSize: '11px',
                                                        transform: `${this.state.sortConfirmed ? 'rotate(180deg)' : 'none'}`,
                                                        transition: 'transform 0.2s ease-in-out'
                                                    }}>
                                                        arrow_downward
                                           </span>
                                                </span>

                                            </th>
                                            <th onClick={() => this.setState({
                                                sortState: false,
                                                sortConfirmed: false,
                                                sortActive: false,
                                                sortDeaths: false,
                                                sortRecovered: !this.state.sortRecovered
                                            })}>{t('RECVRD')}
                                                <span className="material-icons" style={{
                                                    fontSize: '11px',
                                                    transform: `${this.state.sortRecovered ? 'rotate(180deg)' : 'none'}`,
                                                    transition: 'transform 0.2s ease-in-out'
                                                }}>
                                                    arrow_upward
                                        </span>
                                            </th>
                                            <th onClick={() => this.setState({
                                                sortState: false,
                                                sortConfirmed: false,
                                                sortActive: false,
                                                sortDeaths: !this.state.sortDeaths,
                                                sortRecovered: false
                                            })}>{t('DTHS')}
                                                <span className="material-icons" style={{
                                                    fontSize: '11px',
                                                    transform: `${this.state.sortDeaths ? 'rotate(180deg)' : 'none'}`,
                                                    transition: 'transform 0.2s ease-in-out'
                                                }}>
                                                    arrow_upward
                                    </span>
                                            </th>
                                            <th onClick={() => this.setState({
                                                sortState: false,
                                                sortConfirmed: false,
                                                sortActive: !this.state.sortActive,
                                                sortDeaths: false,
                                                sortRecovered: false
                                            })}>{t('ACTV')}
                                                <span className="material-icons" style={{
                                                    fontSize: '11px',
                                                    transform: `${this.state.sortActive ? 'rotate(180deg)' : 'none'}`,
                                                    transition: 'transform 0.2s ease-in-out'
                                                }}>
                                                    arrow_upward
                                    </span>
                                            </th>
                                        </tr>
                                    }
                                </Translation>

                            </thead>
                            <tbody>
                                {
                                    this.state.stateData.map((obj, index) => {
                                        return (
                                            obj.confirmed !== 0 &&
                                            <Fragment key={obj.state + "" + obj.confirmed}>
                                                <tr
                                                    style={{
                                                        background: `${this.props.location.state === obj.state ?
                                                            this.props.isDark ? 'skyblue' : 'aqua' :
                                                            index % 2 !== 0 ?
                                                                this.props.isDark ? '#262529' : '#e4e0e0' : ''}`,
                                                        color: `${this.props.location.state === obj.state && '#000'}`,
                                                        fontWeight: `${this.props.location.state === obj.state && 'bold'}`
                                                    }}
                                                    onClick={() => { this.setState({ clickedState: obj.state, isDistrictOpen: !this.state.isDistrictOpen }) }}
                                                >
                                                    <td>
                                                        <div>&nbsp;</div>
                                                        <i className="fa fa-caret-right"
                                                            style={{
                                                                fontWeight: 'bolder',
                                                                fontSize: '17px',
                                                                color: `${this.props.isDark ? 'aqua' : 'darkblue'}`,
                                                                transform: `${this.state.isDistrictOpen &&
                                                                    this.state.clickedState === obj.state ? 'rotate(90deg)' : 'none'}`,
                                                                transition: 'transform 0.2s ease-in-out'
                                                            }}
                                                        ></i>
                                                    </td>
                                                    <td>
                                                        <div>&nbsp;</div>
                                                        <Translation>
                                                            {t => t(obj.state.toLowerCase().replace(/\b(\w)/g, x => { return (x.toUpperCase()) }))}
                                                        </Translation>

                                                    </td>
                                                    <td>
                                                        <div style={{
                                                        }}> <i style={{
                                                            color: '#00b5ff',
                                                            fontWeight: 'normal',
                                                            fontSize: '12px',
                                                            visibility: `${parseInt(obj.deltaconfirmed) > 0 ? 'visible' : 'hidden'}`,
                                                        }} className="fa fa-arrow-up">
                                                                {parseInt(obj.deltaconfirmed).toLocaleString()}
                                                            </i>

                                                        </div>
                                                        {parseInt(obj.confirmed).toLocaleString('en-IN')}
                                                    </td>
                                                    <td>
                                                        <div style={{
                                                        }}> <i style={{
                                                            color: `${this.props.isDark ? 'lightgreen' : 'green'}`,
                                                            fontWeight: 'normal',
                                                            fontSize: '12px',
                                                            visibility: `${parseInt(obj.deltarecovered) > 0 ? 'visible' : 'hidden'}`,
                                                        }} className="fa fa-arrow-up">
                                                                {parseInt(obj.deltarecovered).toLocaleString()}
                                                            </i>
                                                        </div>
                                                        {parseInt(obj.recovered).toLocaleString('en-IN')}</td>
                                                    <td>
                                                        <div style={{

                                                        }}> <i style={{
                                                            color: 'red',
                                                            fontWeight: 'normal',
                                                            fontSize: '12px',
                                                            visibility: `${parseInt(obj.deltadeaths) > 0 ? 'visible' : 'hidden'}`,
                                                        }} className="fa fa-arrow-up">
                                                                {parseInt(obj.deltadeaths).toLocaleString()}
                                                            </i>
                                                        </div>
                                                        {parseInt(obj.deaths).toLocaleString('en-IN')}</td>
                                                    <td>
                                                        <div>&nbsp;</div>
                                                        {parseInt(obj.active).toLocaleString('en-In')}
                                                    </td>
                                                </tr>
                                                <tr
                                                    className="district-data-div"
                                                    style={{
                                                        background: `${this.props.isDark ? 'transparent' : 'transparent'}`,
                                                        display: "none",
                                                        WebkitTapHighlightColor: 'transparent'
                                                    }}
                                                    id={`data-${obj.state}`}
                                                >
                                                    <td colSpan="5" className="full-width">
                                                        <Translation>
                                                            {t =>
                                                                <div >

                                                                    <div style={{
                                                                        fontSize: '12px',
                                                                        textAlign: 'left', marginLeft: '18px',
                                                                        color: `${this.props.isDark ? 'lightgreen' : 'green'}`
                                                                    }}>{t("Last updated at")} {obj.lastupdatedtime}
                                                                    </div>
                                                                    <div style={{
                                                                        fontSize: '12px',
                                                                        textAlign: 'right', marginRight: '18px',
                                                                        color: `${this.props.isDark ? 'orange' : 'orange'}`
                                                                    }}><Link to={`/state-data/${obj.state}`}>{t("View More Details")}</Link>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </Translation>

                                                        <table className="internal-table">
                                                            <thead>
                                                                <Translation>
                                                                    {t => <tr className="label-div" style={{ background: `${this.props.isDark ? 'rgba(50,58,70)' : '#ccc'}` }} >
                                                                        <th style={{ visibility: 'hidden' }}></th>
                                                                        <th style={{
                                                                            // border: `0.4px solid ${this.props.isDark ? '#eee' : '#262529'}`,
                                                                            borderRight: 'none'
                                                                        }}>{t("DISTRICT")}</th>
                                                                        <th style={{
                                                                            // border: `0.4px solid ${this.props.isDark ? '#eee' : '#262529'}`,
                                                                            // borderLeft: 'none'
                                                                        }}
                                                                            onClick={() => { this.setState({ sortDistrictConf: !this.state.sortDistrictConf }) }}
                                                                        >{t("INFCTD")} <i
                                                                            className=" fa fa-arrow-up"
                                                                            style={{
                                                                                transform: `${this.state.sortDistrictConf ? 'rotate(180deg)' : 'none'}`,
                                                                                transition: 'transform 0.2s ease-in-out'
                                                                            }}
                                                                        ></i>
                                                                        </th>
                                                                        <th style={{
                                                                            // border: `0.4px solid ${this.props.isDark ? '#eee' : '#262529'}`,
                                                                            // borderLeft: 'none'
                                                                        }}
                                                                        // onClick={() => { this.setState({ sortDistrict: !this.state.sortDistrict }) }}
                                                                        >{t("RECVRD")}
                                                                            {/* <i className={`fa ${this.state.sortDistrict ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i> */}
                                                                        </th>
                                                                        <th style={{
                                                                            // border: `0.4px solid ${this.props.isDark ? '#eee' : '#262529'}`,
                                                                            // borderLeft: 'none'
                                                                        }}
                                                                        // onClick={() => { this.setState({ sortDistrictConf: !this.state.sortDistrictConf }) }}
                                                                        >{t("DEATHS")}
                                                                            {/* <i className={`fa ${this.state.sortDistrictConf ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i> */}
                                                                        </th>
                                                                    </tr>
                                                                    }
                                                                </Translation>

                                                            </thead>
                                                            <Translation>
                                                                {
                                                                    t => <tbody>
                                                                        {
                                                                            this.state.districtData.filter(x =>
                                                                                x.state.toLowerCase() === obj.state.toLowerCase()
                                                                            )[0].districtData.sort((x, y) => this.state.sortDistrictConf ? x.confirmed - y.confirmed :
                                                                                y.confirmed - x.confirmed).map((y, index) => {
                                                                                    return (
                                                                                        <tr key={y.district + "" + y.confirmed} className="data-div"
                                                                                            style={{
                                                                                                background: `${this.props.location.district === y.district ?
                                                                                                    'rgb(119, 156, 156)' : index % 2 !== 0 ? this.props.isDark ? '#262529' : '#e4e0e0' : 'transparent'}`,
                                                                                                color: `${this.props.location.district === y.district && '#000 !important'}`,
                                                                                                fontWeight: `${this.props.location.district === y.district && 'bold'}`,

                                                                                            }}>
                                                                                            <td style={{ background: `${this.props.isDark ? '#1e1d21' : '#ebebeb'}` }}>
                                                                                                <div>&nbsp;</div>
                                                                                                <i className="fa fa-angle-right"></i>
                                                                                            </td>
                                                                                            <td style={{ color: `${this.props.isDark ? '#fff' : '#222'}` }}>
                                                                                                <div>&nbsp;</div>
                                                                                                {t(y.district)}

                                                                                                {/* {y.district} */}
                                                                                            </td>
                                                                                            <td style={{
                                                                                                color: `${this.props.isDark ? '#fff' : '#222'}`
                                                                                            }}
                                                                                            >
                                                                                                <div style={{
                                                                                                }}> <i style={{
                                                                                                    color: '#00b5ff',
                                                                                                    fontWeight: 'normal',
                                                                                                    fontSize: '12px',
                                                                                                    visibility: `${y.delta.confirmed > 0 ? 'visible' : 'hidden'}`,
                                                                                                }} className="fa fa-arrow-up">
                                                                                                        {parseInt(y.delta.confirmed).toLocaleString()}</i>
                                                                                                </div>
                                                                                                <span
                                                                                                // style={{
                                                                                                //     paddingLeft: `${y.delta.confirmed < 9 ? '30px' :
                                                                                                //         y.delta.confirmed > 9 && y.delta.confirmed < 99 ? '20px' : '17px'}`
                                                                                                // }}
                                                                                                >
                                                                                                    {y.confirmed.toLocaleString('en-IN')}</span>
                                                                                            </td>
                                                                                            <td style={{
                                                                                                color: `${this.props.isDark ? '#fff' : '#222'}`
                                                                                            }}
                                                                                            >
                                                                                                <div style={{
                                                                                                }}> <i style={{
                                                                                                    color: `${this.props.isDark ? 'lightgreen' : 'green'}`,
                                                                                                    fontWeight: 'normal',
                                                                                                    fontSize: '12px',
                                                                                                    visibility: `${y.delta.recovered > 0 ? 'visible' : 'hidden'}`,
                                                                                                }} className="fa fa-arrow-up">
                                                                                                        {parseInt(y.delta.recovered).toLocaleString()}</i>
                                                                                                </div>
                                                                                                <span
                                                                                                // style={{
                                                                                                //     paddingLeft: `${y.delta.confirmed < 9 ? '30px' :
                                                                                                //         y.delta.confirmed > 9 && y.delta.confirmed < 99 ? '20px' : '17px'}`
                                                                                                // }}
                                                                                                >
                                                                                                    {y.recovered.toLocaleString('en-IN')}</span>
                                                                                            </td>

                                                                                            <td style={{
                                                                                                color: `${this.props.isDark ? '#fff' : '#222'}`
                                                                                            }}
                                                                                            >
                                                                                                <div style={{
                                                                                                }}> <i style={{
                                                                                                    color: 'red',
                                                                                                    fontWeight: 'normal',
                                                                                                    fontSize: '12px',
                                                                                                    visibility: `${y.delta.deceased > 0 ? 'visible' : 'hidden'}`,
                                                                                                }} className="fa fa-arrow-up">
                                                                                                        {parseInt(y.delta.deceased).toLocaleString()}</i>
                                                                                                </div>
                                                                                                <span
                                                                                                // style={{
                                                                                                //     paddingLeft: `${y.delta.confirmed < 9 ? '30px' :
                                                                                                //         y.delta.confirmed > 9 && y.delta.confirmed < 99 ? '20px' : '17px'}`
                                                                                                // }}
                                                                                                >
                                                                                                    {y.deceased.toLocaleString('en-IN')}</span>
                                                                                            </td>
                                                                                            <td>
                                                                                                <div>&nbsp;</div>

                                                                                            </td>

                                                                                        </tr>

                                                                                    )
                                                                                })
                                                                        }
                                                                    </tbody>
                                                                }
                                                            </Translation>

                                                        </table>
                                                        <div style={{
                                                            color: 'skyblue',
                                                            textAlign: 'left',
                                                            marginLeft: '18px',
                                                            fontSize: '11px'
                                                        }}>*Details awaited for Unknown</div>
                                                    </td>
                                                </tr>
                                            </Fragment>

                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* <div className="zone-table">
                        <table className="">
                            <tr>
                                <th></th>
                                <th style={{
                                    width: '100px'
                                }}>District</th>
                                <th>State</th>
                                <th>Zone</th>
                            </tr>
                            {
                                this.state.zoneData && this.state.zoneData.map(x => {
                                    return (
                                        <tr>
                                            <td>
                                                <i className="fa fa-caret-right"></i>
                                            </td>
                                            <td style={{
                                                width: '100px'
                                            }} >{x.district}</td>
                                            <td>{x.state}</td>
                                            <td>{x.zone}</td>
                                        </tr>
                                    )
                                })
                            }

                        </table>
                    </div> */}
                </div >
            </div >

        )
    }
}
const mapStateToProps = (state) => {
    return {
        location: state.users.location
    }
}

export default connect(mapStateToProps, null)(StateTable)
