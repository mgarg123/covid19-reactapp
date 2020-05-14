import React, { Component, Fragment } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import axios from 'axios'
import { Translation } from 'react-i18next'

export class StateCaseChart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            statesList: [],
            data: [],
            apiData: [],
            selectedStateName: localStorage.getItem('ncovindia_usersState')
        }
    }
    componentDidMount() {
        let url = 'https://api.covid19india.org/v2/state_district_wise.json'
        axios.get(url).then(response => {
            let data = response.data
            let initData = []
            for (let i in data) {
                if (data[i].state === this.state.selectedStateName) {
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
        this.setState({ data: newArr, selectedStateName: event.target.value })

    }

    render() {
        return (
            <div className='state-case-chart-cont'>
                <div id="death-rec-title" style={{
                    textAlign: "center",
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}>
                    <span >
                        <Translation>
                            {t => t('Districtwise Cases Distribution')}
                        </Translation>
                    </span>
                </div>
                <div className="scc-main" style={{ background: `${this.props.isDark ? '#262529' : '#fff'}` }}>
                    <div className="buttons" style={{ marginTop: '10px' }}>
                        <select onChange={this.selectedState} value={this.state.selectedStateName}>
                            {
                                this.state.statesList.sort((x, y) => x.localeCompare(y)).map((x, index) => {
                                    return (
                                        <Fragment key={x}>
                                            <Translation>
                                                {t => <option value={x}>{t(x)}</option>}
                                            </Translation>

                                        </Fragment>
                                    )
                                })
                            }

                        </select>
                    </div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                plotBackgroundColor: `${this.props.isDark ? '#262529' : '#fff'}`,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie',
                                backgroundColor: `${this.props.isDark ? '#262529' : '#fff'}`
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: '',
                                style: {
                                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                                    fontWeight: 'bold',
                                    fontSize: '20px'
                                }

                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            legend: {
                                itemStyle: {
                                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
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
                                        enabled: true,
                                        format: '<b>{point.name}</b>:<br>{point.y}',
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                                        style: {
                                            textOutline: false
                                        }
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
