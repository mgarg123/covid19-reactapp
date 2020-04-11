import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import '../css/plot.css'

export class AgeGroupChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // ageData: [],
            data: {}
        }
    }

    componentDidMount() {
        let url = "https://api.rootnet.in/covid19-in/unofficial/covid19india.org"
        axios.get(url).then(response => {
            let patData = response.data.data.rawPatientData
            let age0_12 = patData.filter(x => x.ageEstimate >= 1 && x.ageEstimate <= 12).length
            let age13_25 = patData.filter(x => x.ageEstimate >= 13 && x.ageEstimate <= 25).length
            let age26_40 = patData.filter(x => x.ageEstimate >= 26 && x.ageEstimate <= 40).length
            let age41_59 = patData.filter(x => x.ageEstimate >= 41 && x.ageEstimate <= 59).length
            let age60 = patData.filter(x => x.ageEstimate >= 60).length

            let ageData = [age0_12, age13_25, age26_40, age41_59, age60]
            let labels = ['0-12', '13-25', '26-40', '40-59', '60+']

            let newArr = []
            for (let i in ageData) {
                let obj = {
                    name: labels[i],
                    y: ageData[i]
                }
                newArr.push(obj)
            }

            // this.setState({ ageData: ageData })
            this.setState({ data: newArr })

            // let newData = {
            //     labels: ['0-12', '13-25', '26-40',
            //         '40-59', '60+'],
            //     datasets: [
            //         {
            //             label: 'Age',
            //             backgroundColor: [
            //                 '#B21F00',
            //                 '#C9DE00',
            //                 '#2FDE00',
            //                 '#00A6B4',
            //                 '#6800B4'
            //             ],
            //             hoverBackgroundColor: [
            //                 '#501800',
            //                 '#4B5000',
            //                 '#175000',
            //                 '#003350',
            //                 '#35014F'
            //             ],
            //             data: this.state.ageData,
            //         }
            //     ]
            // }
            // this.setState({ data: newData })

        }).catch(error => console.log(error.message))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.ageData !== this.state.ageData) {

        }
    }



    render() {
        return (
            <div className="graph-container">
                <div className="affected-age-group">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            chart: {
                                plotBackgroundColor: '#262626',
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie',
                                backgroundColor: `${localStorage.getItem('ncovindia_isDark') === 'true' ? 'transparent' : '#fff'}`
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: 'Affected Age Groups',
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

export default AgeGroupChart
