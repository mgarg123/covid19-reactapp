import React, { Component } from 'react'
export class StateTable extends Component {
    constructor(props) {
        super(props)

        this.state = {

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
                            <th>STATE/UT</th>
                            <th>INFECTED</th>
                            <th>RECOVERED</th>
                            <th>DEATHS</th>
                            <th>ACTIVE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.stateData.map((obj, index) => {
                                return (
                                    obj.confirmed !== 0 &&
                                    <tr key={obj.state}
                                        style={{ background: `${index % 2 !== 0 ? this.props.isDark ? '' : '#eee' : ''}` }}
                                    // onMouseOver={() => console.log(err)}
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
