import React, { Component } from 'react'
export class StateTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stateData: props.stateData,
            // sortState: false,
            sortConfirmed: true,
            sortRecovered: false,
            sortDeaths: false,
            sortActive: false
        }
    }

    componentDidMount() {
        // let arr = [...this.state.stateData]
        // arr.sort((x, y) => y.confirmed - x.confirmed)
        // this.setState({ stateData: arr })
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
    }

    render() {
        return (
            <div className="state-table-container">
                <div className="affectedDiv" >
                    <span>{this.props.affectedState} STATES/UTS AFFECTED</span>
                </div>
                {/* <StateTable stateData={this.state.stateData} isDark={this.props.isDark} /> */}
                <table className="state-table">
                    <thead style={{ background: "#222" }}>
                        <tr style={{ backgroundColor: "rgb(141, 133, 211)", color: '#222' }}>
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
                            <span class="material-icons" style={{ fontSize: '11px' }}>
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
                                    <tr key={obj.state}
                                        style={{ background: `${index % 2 !== 0 ? this.props.isDark ? '' : '#eee' : ''}` }}
                                    >
                                        <td>></td>
                                        <td>{obj.state.toLowerCase().replace(/\b(\w)/g, x => { return (x.toUpperCase()) })}</td>
                                        <td>{obj.confirmed}</td>
                                        <td>{obj.recovered}</td>
                                        <td>{obj.deaths}</td>
                                        <td>{obj.active}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>

        )
    }
}

export default StateTable
