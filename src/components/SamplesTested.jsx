import React, { Component } from 'react'
import axios from 'axios'


export class SamplesTested extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sampleData: {}
        }
    }

    componentDidMount() {
        let url = "https://api.covid19india.org/data.json"
        axios.get(url).then(response => {
            let data = response.data

            this.setState({ sampleData: data.tested[data.tested.length - 1] })

        }).catch(error => console.log(error.message))
    }

    render() {
        return (
            <div className="sample-tested-main" >
                <div className="samples-tested-container">
                    <div className="sample-tested-title">
                        <span>Samples Tested</span>
                    </div>
                    <div className='last-updated-time'
                        style={{ fontSize: '11px', color: 'skyblue', textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}
                    >Last Updated on {this.state.sampleData.updatetimestamp !== undefined &&
                        this.state.sampleData.updatetimestamp.split(" ")[0]
                        + " at " + this.state.sampleData.updatetimestamp.split(" ")[1]}</div>
                    <div className="samples-tested" >

                        <div className="sample-box tested"
                            style={{ background: `${this.props.isDark ? '' : '#fff'}` }}>
                            <div style={{ color: '#2ab407' }}>Tested</div>
                            <div style={{ color: `${this.props.isDark ? '#fff' : '#000'}` }}>
                                {this.state.sampleData.totalsamplestested !== undefined &&
                                    this.state.sampleData.totalsamplestested.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <div><hr /></div>
                        </div>
                        <div className="sample-box positive" style={{ background: `${this.props.isDark ? '' : '#fff'}` }}>
                            <div style={{ color: '#01b0e6' }}>Positive</div>
                            <div style={{ color: `${this.props.isDark ? '#fff' : '#000'}` }}>
                                {this.state.sampleData.totalpositivecases !== undefined &&
                                    this.state.sampleData.totalpositivecases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </div>
                            <div><hr /></div>
                        </div>
                    </div>
                </div>
                {/* <TopFiveStates /> */}
            </div>
        )
    }
}

export default SamplesTested
