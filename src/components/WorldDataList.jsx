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
                <div><span style={{
                    fontSize: '14px', color: `${this.props.isDark ? 'skyblue' : 'blue'}`,
                    textTransform: 'uppercase',
                    marginTop: '10px'
                }}>
                    {this.props.showData.length} Countries Affected</span>
                </div>
                <div><span style={{ fontSize: '11px' }}>*Click on the countries to know their detailed stats</span></div>

                <table className="state-table" style={{ width: '340px' }}>
                    <thead style={{ display: 'table-row', transform: 'none' }}>
                        <tr >
                            <th style={{ width: '30px' }}></th>
                            <th style={{
                                width: '150px', border: 'none',
                                fontSize: '14px',
                                border: '0.5px solid',
                                textAlign: 'left',
                                fontWeight: 'bold',
                                background: `${this.props.isDark ? '#1c1c1c' : '#ccc'}`
                            }}>COUNTRY NAME</th>
                            <th style={{
                                width: '150px', border: 'none',
                                fontSize: '14px',
                                border: '0.4px solid',
                                fontWeight: 'bold',
                                background: `${this.props.isDark ? '#1c1c1c' : '#ccc'}`,
                                textAlign: 'center'
                            }}
                                onClick={() => this.setState({ sortCases: !this.state.sortCases })}
                            >INFECTED <i className={`fa ${this.state.sortCases ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i></th>
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
                                                <td style={{ width: '30px' }}>{x.index}</td>

                                                <td style={{ width: '170px', textAlign: 'left' }}>
                                                    <Link to={`/world-data/${x.country}`}>{x.country}</Link>
                                                </td>

                                                <td style={{ width: '130px' }}>
                                                    <Link to={`/world-data/${x.country}`}>{x.confirmed.toLocaleString('en-IN')}</Link>
                                                </td>
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
