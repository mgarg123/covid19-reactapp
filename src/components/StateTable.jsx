import React, { Component } from 'react'
import '../css/table.css'

export class StateTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stateData: props.stateData,
            // sortState: false,
            sortConfirmed: true,
            sortRecovered: false,
            sortDeaths: false,
            sortActive: false,
            clickedState: "",
            isDistrictOpen: false,
            sortDistrict: false
        }
    }

    componentDidMount() {
        console.log(this.props.stateData);

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
                document.getElementById("data-" + prevState.clickedState).style.display = "none"
            }

            if (this.state.clickedState !== prevState.clickedState && this.state.isDistrictOpen === false) {
                document.getElementById("data-" + prevState.clickedState).style.display = "none"
                document.getElementById("data-" + this.state.clickedState).style.display = "table-row"
                this.setState({ isDistrictOpen: true })
            }


        }
        if (this.state.isDistrictOpen !== prevState.isDistrictOpen) {
            if (this.state.isDistrictOpen === true) {
                document.getElementById("data-" + this.state.clickedState).style.display = "table-row"
            } else {
                document.getElementById("data-" + prevState.clickedState).style.display = "none"
            }
        }


    }

    render() {
        return (
            <div className="state-table-container">
                <div className="affectedDiv" >
                    <span>{this.props.affectedState} STATES/UTS AFFECTED</span>
                </div><div className="feature-notice" style={{ fontSize: '10px', textAlign: 'center', marginTop: '10px' }} >
                    <span>* Click on the states to see affected districts</span>
                </div>
                {/* <StateTable stateData={this.state.stateData} isDark={this.props.isDark} /> */}
                <div className="table-container">
                    <table className="state-table">
                        <thead style={{ background: `${this.props.isDark ? 'rgb(50, 58, 70)' : 'rgb(208, 206, 206)'}`, fontWeight: 'bold' }}>
                            <tr>
                                <th style={{ visibility: "hidden" }}></th>
                                <th onClick={() => this.setState({
                                    // sortState: !this.state.sortState,
                                    sortConfirmed: false,
                                    sortActive: false,
                                    sortDeaths: false,
                                    sortRecovered: false
                                })}>STATE/UT
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
                                })}>INFECTED
                            <span className="material-icons" style={{ fontSize: '11px' }}>
                                        {this.state.sortConfirmed ? 'arrow_upward' : 'arrow_downward'}</span>
                                </th>
                                <th onClick={() => this.setState({
                                    sortState: false,
                                    sortConfirmed: false,
                                    sortActive: false,
                                    sortDeaths: false,
                                    sortRecovered: !this.state.sortRecovered
                                })}>RECOVERED
                            <span class="material-icons" style={{ fontSize: '11px' }}>
                                        {this.state.sortRecovered ? 'arrow_downward' : 'arrow_upward'}</span>
                                </th>
                                <th onClick={() => this.setState({
                                    sortState: false,
                                    sortConfirmed: false,
                                    sortActive: false,
                                    sortDeaths: !this.state.sortDeaths,
                                    sortRecovered: false
                                })}>DEATHS
                            <span class="material-icons" style={{ fontSize: '11px' }}>
                                        {this.state.sortDeaths ? 'arrow_downward' : 'arrow_upward'}
                                    </span>
                                </th>
                                <th onClick={() => this.setState({
                                    sortState: false,
                                    sortConfirmed: false,
                                    sortActive: !this.state.sortActive,
                                    sortDeaths: false,
                                    sortRecovered: false
                                })}>ACTIVE
                            <span class="material-icons" style={{ fontSize: '11px' }}>
                                        {this.state.sortActive ? 'arrow_downward' : 'arrow_upward'}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stateData.map((obj, index) => {
                                    return (
                                        obj.confirmed !== 0 &&
                                        <>
                                            <tr key={obj.state}
                                                style={{ background: `${index % 2 !== 0 ? this.props.isDark ? '#1c1c1c' : '#eee' : ''}` }}
                                                onClick={() => { this.setState({ clickedState: obj.state, isDistrictOpen: !this.state.isDistrictOpen }) }}
                                            >
                                                <td>
                                                    <i className={`${this.state.isDistrictOpen &&
                                                        this.state.clickedState === obj.state ? "fa fa-caret-down" :
                                                        "fa fa-caret-right"}`}
                                                        style={{
                                                            fontWeight: 'bolder',
                                                            fontSize: '17px',
                                                            color: `${this.props.isDark ? 'aqua' : 'darkblue'}`
                                                        }}
                                                    ></i>
                                                </td>
                                                <td>{obj.state.toLowerCase().replace(/\b(\w)/g, x => { return (x.toUpperCase()) })}</td>
                                                <td>{obj.confirmed}</td>
                                                <td>{obj.recovered}</td>
                                                <td>{obj.deaths}</td>
                                                <td>{obj.active}</td>
                                            </tr>
                                            <tr
                                                className="district-data-div"
                                                style={{
                                                    background: `${this.props.isDark ? '#262626' : '#fff'}`,
                                                    display: "none",
                                                    WebkitTapHighlightColor: 'transparent'
                                                }}
                                                id={`data-${obj.state}`}
                                            >
                                                <td colSpan="5" className="full-width">
                                                    <table className="internal-table">
                                                        <tr className="label-div">
                                                            <th style={{ visibility: 'hidden' }}></th>
                                                            <th style={{
                                                                border: `0.4px solid ${this.props.isDark ? '#eee' : '#1c1c1c'}`,
                                                                borderRight: 'none'
                                                            }}>District Name</th>
                                                            <th style={{
                                                                border: `0.4px solid ${this.props.isDark ? '#eee' : '#1c1c1c'}`,
                                                                // borderLeft: 'none'
                                                            }}
                                                                onClick={() => { this.setState({ sortDistrict: !this.state.sortDistrict }) }}
                                                            >Infected <i
                                                                className={`fa ${this.state.sortDistrict ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                                                            </th>
                                                        </tr>
                                                        {
                                                            this.props.districtDatas.filter(x =>
                                                                x.state.toLowerCase() === obj.state.toLowerCase()
                                                            )[0].districtData.sort((x, y) => this.state.sortDistrict ? x.confirmed - y.confirmed : y.confirmed - x.confirmed).map(y => {
                                                                return (
                                                                    <tr className="data-div" style={{ background: 'transparent' }}>
                                                                        <td><i className="fa fa-angle-right"></i></td>
                                                                        <td style={{ color: `${this.props.isDark ? '#fff' : '#222'}` }}>
                                                                            {y.district}
                                                                        </td>
                                                                        <td style={{
                                                                            color: `${this.props.isDark ? '#fff' : '#222'}`
                                                                        }}
                                                                        >
                                                                            <span style={{
                                                                            }}> <i style={{
                                                                                color: 'red',
                                                                                fontWeight: 'normal',
                                                                                fontSize: '12px',
                                                                                visibility: `${y.delta.confirmed > 0 ? 'visible' : 'hidden'}`,
                                                                            }} className="fa fa-arrow-up">
                                                                                    {y.delta.confirmed}</i>
                                                                            </span>
                                                                            <span
                                                                                style={{
                                                                                    paddingLeft: `${y.delta.confirmed < 9 ? '30px' :
                                                                                        y.delta.confirmed > 9 && y.delta.confirmed < 99 ? '20px' : '17px'}`
                                                                                }}>
                                                                                {y.confirmed}</span>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </table>
                                                </td>
                                            </tr>
                                        </>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

export default StateTable
