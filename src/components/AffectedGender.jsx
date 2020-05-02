import React, { Component } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

export class AffectedGender extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }
    componentDidMount() {
        let url = "https://api.covid19india.org/raw_data.json"
        axios.get(url).then(response => {
            let data = response.data
            let males = data.raw_data.filter(x => x.gender === 'M').length
            let females = data.raw_data.filter(x => x.gender === 'F').length
            let labels = ['Male', 'Female']
            let genderData = [males, females]

            let newArr = []

            for (let i in genderData) {
                let obj = {
                    name: labels[i],
                    y: genderData[i]
                }
                newArr.push(obj)
            }

            this.setState({
                data: newArr
            })
        }).catch(err => console.log(err.message))

    }

    render() {
        return (
            <div className="graph-container">
                <div id="death-rec-title" style={{
                    textAlign: "center",
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                    fontSize: '20px',
                    fontWeight: 'bold',

                }}>
                    <span > Affected Gender Distribution</span>
                </div>
                <div className="affected-genders" style={{ background: `${this.props.isDark ? '#262529' : '#ebebeb'}` }}>
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
                                        distance: -50,
                                        color: 'white',
                                        style: {
                                            textOutline: false
                                        }
                                    },
                                    showInLegend: true
                                }
                            },
                            series: [{
                                name: 'Age',
                                colorByPoint: true,
                                data: this.state.data
                            }]
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default AffectedGender
