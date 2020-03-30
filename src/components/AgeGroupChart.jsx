import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import axios from 'axios'
import '../css/plot.css'

export class AgeGroupChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ageData: [],
            data: {
                labels: ['Age 0-12', 'Age 13-25', 'Age 26-40',
                    'Age 40-59', 'Age 60+'],
                datasets: [
                    {
                        label: 'Rainfall',
                        backgroundColor: [
                            '#B21F00',
                            '#C9DE00',
                            '#2FDE00',
                            '#00A6B4',
                            '#6800B4'
                        ],
                        hoverBackgroundColor: [
                            '#501800',
                            '#4B5000',
                            '#175000',
                            '#003350',
                            '#35014F'
                        ],
                        data: [],
                    }
                ]
            }
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
            this.setState({ ageData: ageData })

            let newData = {
                labels: ['Age 0-12', 'Age 13-25', 'Age 26-40',
                    'Age 40-59', 'Age 60+'],
                datasets: [
                    {
                        label: 'Age',
                        backgroundColor: [
                            '#B21F00',
                            '#C9DE00',
                            '#2FDE00',
                            '#00A6B4',
                            '#6800B4'
                        ],
                        hoverBackgroundColor: [
                            '#501800',
                            '#4B5000',
                            '#175000',
                            '#003350',
                            '#35014F'
                        ],
                        data: this.state.ageData,
                    }
                ]
            }
            this.setState({ data: newData })

        }).catch(error => console.log(error.message))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.ageData !== this.state.ageData) {

        }
    }



    render() {
        return (
            <div className="graph-container">
                <Pie
                    data={this.state.data}
                    options={{
                        title: {
                            display: true,
                            text: 'Affected Age Groups',
                            fontSize: 20,
                            fontColor: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                            position: "top"
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                fontColor: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                            }
                        }
                    }}

                />
            </div>
        )
    }
}

export default AgeGroupChart
