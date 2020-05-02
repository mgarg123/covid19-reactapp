import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

export class WorldDataList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sortCases: false,
            userCountry: ''
        }
    }

    componentDidMount() {

        //IP Address to Country Name using ipinfo API
        // axios.get('https://ipinfo.io?token=d67524c3026916').then(response => {
        //     let data = response.data
        //     let countryCode = data.country

        //     //Country code to country name mapping
        //     axios.get('https://restcountries.eu/rest/v2/alpha/' + countryCode).then(response => {
        //         let countryName = response.data.name

        //         sessionStorage.setItem('ncovindia_usersCountry', countryName)   //Setting User's Country Name to Session Storage

        //     }).catch(error => console.log(error.message))

        // }).catch(error => console.log(error.message));

        //IP Address to Country Name using ipapi.co API
        // axios.get('https://ipapi.co/json').then(response => {
        //     let data = response.data
        //     let countryName = data.country_name

        //     sessionStorage.setItem('ncovindia_usersCountry', countryName)   //Setting User's Country Name to Session Storage
        //     this.setState({ userCountry: countryName })

        // }).catch(error => console.log(error.message));
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
                <div style={{}}>
                    <table className="state-table" style={{ width: '340px' }}>
                        <thead style={{ display: 'block', transform: 'none' }}>
                            <tr >
                                <th style={{ width: '30px' }}></th>
                                <th style={{
                                    width: '140px', border: 'none',
                                    fontSize: '14px',
                                    //eslint-disable-next-line
                                    border: '0.5px solid',
                                    textAlign: 'left',
                                    fontWeight: 'bold',
                                    background: `${this.props.isDark ? '#1c1c1c' : '#ccc'}`
                                }}>COUNTRY NAME</th>
                                <th style={{
                                    width: '130px', border: 'none',
                                    fontSize: '14px',
                                    //eslint-disable-next-line
                                    border: '0.4px solid',
                                    fontWeight: 'bold',
                                    background: `${this.props.isDark ? '#1c1c1c' : '#ccc'}`,
                                    textAlign: 'center'
                                }}
                                    onClick={() => this.setState({ sortCases: !this.state.sortCases })}
                                >INFECTED <i className={`fa ${this.state.sortCases ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i></th>
                            </tr>
                        </thead>
                        <tbody style={{ display: 'block', height: '420px', overflowY: 'scroll', transform: 'none' }}>
                            {
                                this.props.showData.sort((x, y) => this.state.sortCases ? parseInt(x.confirmed) - parseInt(y.confirmed) :
                                    parseInt(y.confirmed) - parseInt(x.confirmed)).map(
                                        (x, index) => {
                                            return (

                                                <tr key={x.country}
                                                    style={{
                                                        background: `${this.props.location.country === x.country ?
                                                            this.props.isDark ? 'skyblue' : 'aqua' :
                                                            index % 2 !== 0 ?
                                                                this.props.isDark ? '#1c1c1c' : '#eee' : ''}`
                                                    }}>
                                                    <td style={{ width: '30px' }}>{x.index}</td>

                                                    <td style={{ width: '140px', textAlign: 'left' }}>
                                                        <Link to={`${x.country === 'India' ? '/' : `/world-data/${x.country}`}`}>
                                                            {x.country}
                                                        </Link>
                                                    </td>

                                                    <td style={{ width: '130px' }}>
                                                        <Link to={`${x.country === 'India' ? '/' : `/world-data/${x.country}`}`}>
                                                            {x.confirmed.toLocaleString('en-IN')}
                                                        </Link>
                                                    </td>
                                                </tr>

                                            )
                                        }
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        location: state.users.location
    }
}

export default connect(mapStateToProps, null)(WorldDataList)
