import React, { Component } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import axios from 'axios'

export class StateCaseChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            statesList: [],
            data: [],
            apiData: []
        }
    }
    componentDidMount() {
        let url = 'https://api.covid19india.org/v2/state_district_wise.json'
        axios.get(url).then(response => {
            let data = response.data
            let initData = []
            for (let i in data) {
                if (data[i].state === 'Andaman and Nicobar Islands') {
                    for (let j in data[i].districtData) {
                        let obj = {
                            name: data[i].districtData[j].district,
                            y: data[i].districtData[j].confirmed,
                            sliced: true,
                            selected: true
                        }
                        initData.push(obj)
                    }
                }
            }
            let statesList = data.map(x => x.state)
            this.setState({ data: initData, apiData: data, statesList: statesList })
        }).catch(error => console.log(error.message));
    }

    selectedState = (event) => {
        let data = [...this.state.apiData]
        let newArr = []
        for (let i in data) {
            if (data[i].state === event.target.value) {
                for (let j in data[i].districtData) {
                    let obj = {
                        name: data[i].districtData[j].district,
                        y: data[i].districtData[j].confirmed,
                        sliced: true,
                        selected: true
                    }
                    newArr.push(obj)
                }
            }
        }
        this.setState({ data: newArr })

    }

    render() {
        return (
            <div className='state-case-chart-cont'>
                <div id="death-rec-title" style={{
                    textAlign: "center",
                    color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#fff' : '#2d2d2d'}`,
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>
                    <span > Districtwise Cases Distribution</span>
                </div>
                <div className="scc-main">
                    <div className="buttons" style={{ marginTop: '10px' }}>
                        <select onChange={this.selectedState}>
                            {
                                this.state.statesList.sort((x, y) => x.localeCompare(y)).map((x, index) => {
                                    return (
                                        <>
                                            <option selected={index === 0 ? true : false} value={x}>{x}</option>
                                        </>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                plotBackgroundColor: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#262626' : '#fff'}`,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie',
                                backgroundColor: `${localStorage.getItem('ncovindia_isDark') === 'true' ? 'transparent' : '#fff'}`
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: '',
                                style: {
                                    color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#fff' : '#2d2d2d'}`,
                                    fontWeight: 'bold',
                                    fontSize: '20px'
                                }

                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            legend: {
                                itemStyle: {
                                    color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#fff' : '#2d2d2d'}`
                                }
                            },
                            accessibility: {
                                point: {
                                    valueSuffix: '%'
                                }
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                }
                            },
                            series: [{
                                name: 'Infected',
                                colorByPoint: true,
                                data: this.state.data
                            }]
                        }}
                    />
                </div>
            </ div>
        )
    }
}

export default StateCaseChart
