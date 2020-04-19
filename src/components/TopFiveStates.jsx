import React, { Component } from 'react'
import axios from 'axios'

export class TopFiveStates extends Component {
    constructor(props) {
        super(props)

        this.state = {
            topFiveStates: []
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

        }).catch(error => console.log(error.message))
    }

    render() {
        let separator = '/';
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        var currentDate = `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`;
        return (
            <div className='top-five-container'>
                <div className="title"><span>Top 5 Affected States ({currentDate})</span></div>
                <div className="top-five-main">
                    <table className='tfs-table'>
                        <thead style={{
                            background: `${localStorage.getItem('ncovindia_isDark') === 'true' ?
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
                                this.state.topFiveStates.map((obj, index) => {
                                    return (
                                        <tr key={obj.state}
                                            style={{
                                                background: `${index % 2 !== 0 ?
                                                    localStorage.getItem('ncovindia_isDark') === 'true' ? '#1c1c1c' : '#eee' : ''}`
                                            }}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{obj.state}</td>
                                            <td>{obj.deltaconfirmed}</td>
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
