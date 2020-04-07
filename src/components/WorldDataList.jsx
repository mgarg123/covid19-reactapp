import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class WorldDataList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sortCases: false
        }
    }

    render() {
        return (
            <div className="state-table-container" style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '15px 0px 10px 0px'
            }}>
                <div><span style={{ fontSize: '11px' }}>*Click on the countries to know their stats</span></div>
                <table className="state-table" style={{ width: '340px' }}>
                    <thead style={{ display: 'table-row', transform: 'none' }}>
                        <tr >
                            <th></th>
                            <th style={{
                                width: '160px', border: 'none',
                                fontSize: '16px',
                                border: '0.5px solid'
                            }}>Country Name</th>
                            <th style={{
                                width: '160px', border: 'none',
                                fontSize: '16px',
                                border: '0.5px solid',
                                paddingRight: '8px'
                            }}
                                onClick={() => this.setState({ sortCases: !this.state.sortCases })}
                            >Confirmed Cases <i className={`fa ${this.state.sortCases ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i></th>
                        </tr>
                    </thead>
                    <tbody style={{ display: 'table-row', transform: 'none' }}>
                        {
                            this.props.showData.sort((x, y) => this.state.sortCases ? parseInt(x.confirmed) - parseInt(y.confirmed) :
                                parseInt(y.confirmed) - parseInt(x.confirmed)).map(
                                    (x, index) => {
                                        return (
                                            <tr key={x.country}
                                                style={{ background: `${index % 2 !== 0 ? this.props.isDark ? '#1c1c1c' : '#eee' : ''}` }}>
                                                <td>></td>
                                                <td><Link to={`/world-data/${x.country}`}>{x.country}</Link></td>
                                                <td>{x.confirmed}</td>
                                            </tr>
                                        )
                                    }
                                )
                        }
                    </tbody>
                </table>
            </div>

        )
    }
}

export default WorldDataList
