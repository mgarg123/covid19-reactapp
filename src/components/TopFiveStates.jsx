import React, { Component } from 'react'
import axios from 'axios'

export class TopFiveStates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topFiveStates: [],
            date: ''
        }
    }
    componentDidMount() {
        let url = 'https://api.covid19india.org/data.json'
        axios.get(url).then(response => {
            let data = response.data
            let sortedData = data.statewise.sort((x, y) => y.deltaconfirmed - x.deltaconfirmed)
            let topFiveStates = []
            for (let i = 1; i < 6; i++) {
                topFiveStates.push(sortedData[i])
            }

            this.setState({ topFiveStates: topFiveStates })

        }).catch(error => console.log(error.message));

        let date = new Date()
        let currdate = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate()
        let month = date.getMonth().toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let todayDate = currdate + "/" + month + "/" + date.getFullYear()
        this.setState({ date: todayDate })
    }

    render() {
        return (
            <div className='top-five-container'>
                <div className="tf-title"><span>Top 5 Affected {this.props.topFiveDistrictData === undefined ? 'States' : 'Districts'} ({this.state.date})</span></div>
                <div className="top-five-main">
                    <table className='tfs-table' style={{
                        background: `${this.props.isDark ? '#1e1d21' : '#fff'}`,
                        boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.4' : '0.16'})`
                    }}>
                        <thead style={{
                            background: `${this.props.isDark ?
                                'rgb(50, 58, 70)' : 'rgb(208, 206, 206)'}`, fontWeight: 'bold'
                        }}>
                            <tr>
                                <th></th>
                                <th>State</th>
                                <th>Infected</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.topFiveDistrictData === undefined ? this.state.topFiveStates.map((obj, index) => {
                                    return (
                                        <tr key={obj.state}
                                            style={{
                                                background: `${index % 2 !== 0 ?
                                                    this.props.isDark ? '#262529' : '#eee' : ''}`
                                            }}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{obj.state}</td>
                                            <td>{obj.deltaconfirmed}</td>
                                        </tr>
                                    )
                                }) :
                                    this.props.topFiveDistrictData.map((obj, index) => {
                                        return (
                                            <tr key={obj.district}
                                                style={{
                                                    background: `${index % 2 !== 0 ?
                                                        this.props.isDark ? '#262529' : '#eee' : ''}`
                                                }}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{obj.district}</td>
                                                <td>{obj.delta.confirmed}</td>
                                            </tr>
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

export default TopFiveStates
