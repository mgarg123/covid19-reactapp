import React, { PureComponent } from 'react'
import axios from 'axios'
import CountUp from 'react-countup'
import { Translation } from 'react-i18next'


export class SamplesTested extends PureComponent {
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
        let totalPositive = parseInt(JSON.parse(localStorage.ncovindia_stats).confirmed)

        return (
            <div className="sample-tested-main" >
                <div className="samples-tested-container" title="Count of samples tested till yet.">
                    <div className="sample-tested-title">
                        <span>
                            <Translation>
                                {t => t("Samples Tested")}
                            </Translation>
                        </span>
                    </div>
                    {/* <div className='last-updated-time'
                        style={{
                            color: 'skyblue'
                        }}
                    >Last Updated on {this.state.sampleData.updatetimestamp !== undefined &&
                        this.state.sampleData.updatetimestamp.split(" ")[0]
                            + " at " + this.state.sampleData.updatetimestamp.split(" ")[1]}
                    </div> */}
                    <div className="samples-tested" >

                        <div className="sample-box tested"
                            style={{
                                background: `${this.props.isDark ? '#262529' : '#fff'}`,
                                boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.4' : '0.16'})`
                            }}>
                            <div style={{ color: '#2ab407' }}>
                                <Translation>
                                    {t => t("Tested")}
                                </Translation>
                            </div>
                            <div className="test-rate">
                                <div
                                    id="rate-percent"
                                    style={{ backgroundColor: '#2ab407' }}
                                >
                                    <span className="material-icons" style={{ fontSize: '10px' }}>
                                        trending_up</span>
                                </div>
                            </div>
                            <div style={{ color: `${this.props.isDark ? '#fff' : '#000'}` }}>
                                {this.props.testData === undefined ? this.state.sampleData.totalsamplestested !== undefined &&
                                    <CountUp
                                        start={this.state.sampleData.totalsamplestested - 20}
                                        end={parseInt(this.state.sampleData.totalsamplestested)}
                                        delay={0.5}
                                        formattingFn={(n) => n.toLocaleString('en-IN')}
                                    /> : <CountUp
                                        start={parseInt(this.props.testData.totaltested - 20)}
                                        end={parseInt(this.props.testData.totaltested)}
                                        delay={0.5}
                                        formattingFn={(n) => n.toLocaleString('en-IN')}
                                    />

                                }
                            </div>
                            <div><hr /></div>
                        </div>
                        <div className="sample-box positive" style={{
                            background: `${this.props.isDark ? '#262529' : '#fff'}`,
                            boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.4' : '0.16'})`
                        }}>
                            <div style={{ color: '#01b0e6' }}>
                                <Translation>
                                    {t => t("Positive")}
                                </Translation>
                            </div>
                            <div className="test-rate">
                                <div
                                    id="rate-percent"
                                    style={{ backgroundColor: '#01b0e6' }}
                                >
                                    <span className="material-icons" style={{ fontSize: '10px' }}>
                                        trending_up</span>
                                    {
                                        this.state.testData === undefined ? ((totalPositive / parseInt(this.state.sampleData.totalsamplestested))
                                            * 100).toPrecision(3) + "%" : ((parseInt(this.props.testData.positive) / parseInt(this.props.testData.totalsamplestested))
                                                * 100).toPrecision(3) + "%"
                                    }
                                    {}
                                </div>
                            </div>
                            <div style={{ color: `${this.props.isDark ? '#fff' : '#000'}` }}>
                                {
                                    this.props.testData === undefined ? <CountUp
                                        start={totalPositive - 20}
                                        end={totalPositive}
                                        delay={0.5}
                                        formattingFn={(n) => n.toLocaleString('en-IN')}
                                    /> : <CountUp
                                            start={parseInt(this.props.testData.positive) - 20}
                                            end={parseInt(this.props.testData.positive)}
                                            delay={0.5}
                                            formattingFn={(n) => n.toLocaleString('en-IN')}
                                        />
                                }




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
