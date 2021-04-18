import React, { Component, Fragment } from 'react'
import CaseBox from './CaseBox'
import axios from 'axios'
import '../css/index.css'
import Header from './Header'
import SamplesTested from './SamplesTested'
import TopFiveStates from './TopFiveStates'
import { connect } from 'react-redux'
import Footer from './Footer'
import { Translation } from 'react-i18next'
import HeaderTab from './HeaderTab'
import StatesDashboardGraphs from './StatesDashboardGraphs'
import Typical from 'react-typical'



export class StatesDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stats: { lastupdatedtime: "" },
            stateData: [],
            testData: [],
            topFiveDistrirctData: [],
            districtData: [],
            showDistrictData: [],
            districtSearchVal: "",
            isStats: true,
            stateName: '',
            disableTypingAnimation: false,
            animatedDistrict: []
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props
        let allStateDatas = JSON.parse(localStorage.getItem('ncovindia_stateData'))
        // let allDistrictData = JSON.parse(localStorage.getItem('ncovindia_districtData'))

        let stateName = params.statename.replace("-", " ")
        this.setState({ stateName: '"' + stateName + '"' })

        let url3 = "https://api.covid19india.org/v2/state_district_wise.json"
        axios.get(url3).then(response => {
            let data = response.data

            let currDistrictData = data.filter(x => x.state === stateName);

            let tfDatas = currDistrictData[0].districtData
            tfDatas.sort((x, y) => y.delta.confirmed - x.delta.confirmed)
            let topFiveData = []
            for (let i = 0; i < 5; i++) {
                topFiveData.push(tfDatas[i])
            }
            tfDatas.sort((x, y) => y.confirmed - x.confirmed)
            // console.log(tfDatas);
            let animDist = [tfDatas[3].district, 1000,
            tfDatas[0].district, 1000,
            tfDatas[2].district, 1000,
            tfDatas[4].district, 1000

            ]
            this.setState({
                topFiveDistrictData: topFiveData,
                districtData: tfDatas,
                showDistrictData: tfDatas,
                animatedDistrict: animDist
            })
            //Setting District Data to LocalStorage
            localStorage.setItem('ncovindia_districtData', JSON.stringify(data))
        }).catch(error => console.log(error.message))

        let currStateData = allStateDatas.filter(x => x.state === stateName);


        //Setting UP top Five District Data


        //Last Updated Time 
        let lastUpTime = currStateData[0].lastupdatedtime.split(" ")[1].split(":")

        let time = new Date()
        let currHour = time.getHours()
        let currMin = time.getMinutes()
        let updatedTime = ""

        if ((currHour - parseInt(lastUpTime[0]) === 0) && (currMin - parseInt(lastUpTime[1]) >= 0)) {
            updatedTime = Math.abs(currMin - parseInt(lastUpTime[1])) + " Minutes"
        }
        else if ((currHour - parseInt(lastUpTime[0]) !== 0) && (currMin < parseInt(lastUpTime[1]))) {
            updatedTime = 60 - Math.abs(currMin - parseInt(lastUpTime[1])) + " Minutes"
        } else {
            updatedTime = Math.abs(currHour - parseInt(lastUpTime[0])) + " Hours"
        }
        let stats = {
            stateName: stateName,
            confirmed: currStateData[0].confirmed,
            deaths: currStateData[0].deaths,
            recovered: currStateData[0].recovered,
            active: currStateData[0].active,
            deltaconfirmed: currStateData[0].deltaconfirmed,
            deltarecovered: currStateData[0].deltarecovered,
            deltadeaths: currStateData[0].deltadeaths,
            lastupdatedtime: updatedTime
        }
        // console.log(stats);
        this.setState({ stats: stats });

        axios.get('https://api.covid19india.org/state_test_data.json').then(response => {
            let data = response.data

            let testData = data.states_tested_data.filter(x => x.state === stateName)
            let testDataObj = []
            if (testData[testData.length - 1].totaltested !== "") {
                testDataObj = testData[testData.length - 1]
            } else {
                testDataObj = testData[testData.length - 2]
            }

            this.setState({ testData: testDataObj })
            // console.log(testDataObj);
        }).catch(error => console.log(error.message));

    }

    whichTab = (isStats) => {
        this.setState({ isStats: isStats })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.districtSearchVal !== prevState.districtSearchVal) {
            let data = [...this.state.districtData]
            let result = data.filter(x => x.district.toLowerCase().includes(this.state.districtSearchVal.toLocaleLowerCase()))
            this.setState({
                showDistrictData: result
            })
        }
    }

    render() {
        // console.log(this.state.districtData.length > 0);

        return (
            <Fragment>
                <div className="site-holder" style={{
                    background: `${this.props.isDark ? "#1e1d21" : "#ebebeb"}`,
                    color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                }}>
                    <Header />
                    <HeaderTab tabs={["Statistics", "Graphs"]} tabClickedCallBack={this.whichTab} />
                    <div className="main-cont-state main-cont" style={{
                        marginTop: '-10px',
                        background: `${this.props.isDark ? '#1e1d21' : '#ebebeb'}`,
                    }}>

                        {
                            this.state.isStats ?
                                <Fragment>
                                    <div className="state-data-container current-number-container" style={{

                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`
                                    }}>
                                        <div className="dashboard">
                                            <div className="state-title" style={{
                                                padding: '10px 0px',
                                                textAlign: 'center',
                                                fontSize: '22px',
                                                fontWeight: 'bold',
                                                marginTop: '-15px'
                                            }}>
                                                <span style={{
                                                    borderBottom: '0.5px solid grey',
                                                    letterSpacing: '1px',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    <Translation>
                                                        {t => t(this.state.stats.stateName)}
                                                    </Translation>
                                                </span>
                                            </div>
                                            <div className='last-updated-at' style={{
                                                color: `${this.props.isDark ? 'skyblue' : 'red'}`,
                                                fontSize: '13px'
                                            }}>
                                                <Translation>
                                                    {t => <span>
                                                        {t('Last Updated') + " "}
                                                        {this.state.stats.lastupdatedtime.includes('Hours') && t('About') + " "}
                                                        {this.state.stats.lastupdatedtime} {t('Ago')}</span>}
                                                </Translation>
                                            </div>
                                            <div className="current-cont">
                                                <CaseBox title={"Infected"}
                                                    bgColor={"rgb(1, 176, 230)"}
                                                    val={this.state.stats.confirmed}
                                                    conf={this.state.stats.confirmed}
                                                    todayDelta={this.state.stats.deltaconfirmed}
                                                    cls={'conf-no'}         //For Animating
                                                    isDark={this.props.isDark} />
                                                <CaseBox title={"Recovered"}
                                                    bgColor={"rgb(42, 180, 7)"}
                                                    val={this.state.stats.recovered}
                                                    conf={this.state.stats.confirmed}
                                                    cls={'rec-no'}
                                                    todayDelta={this.state.stats.deltarecovered}
                                                    isDark={this.props.isDark} />
                                                <CaseBox title={"Deaths"}
                                                    bgColor={"rgb(255, 0, 0)"}
                                                    val={this.state.stats.deaths}
                                                    conf={this.state.stats.confirmed}
                                                    todayDelta={this.state.stats.deltadeaths}
                                                    cls={'dth-no'}
                                                    isDark={this.props.isDark} />
                                                <CaseBox title={"Active"}
                                                    bgColor={"rgb(196, 4, 221)"}
                                                    val={this.state.stats.active}
                                                    conf={this.state.stats.confirmed}
                                                    cls={'act-no'}
                                                    isDark={this.props.isDark} />
                                            </div>
                                        </div>
                                        <div className="sample-tf-cont">
                                            <SamplesTested isDark={this.props.isDark} testData={this.state.testData} />
                                            <TopFiveStates isDark={this.props.isDark} topFiveDistrictData={this.state.topFiveDistrictData} />
                                        </div>
                                    </div>
                                    <div className="map-and-tf-container" style={{
                                        background: `${this.props.isDark ? '#1e1d21' : '#ebebeb'}`,
                                        color: `${this.props.isDark ? '#fff' : '#2d2d2d'}`,
                                        marginBottom: '30px',
                                        flexWrap: 'wrap',
                                    }} >
                                        <div style={{ width: 'fit-content', margin: '0 auto', position: "relative" }}>
                                            <Translation>
                                                {
                                                    t => <>
                                                        <input type="text"
                                                            value={this.state.countrySearchVal}
                                                            name="countryname"
                                                            id="countryname"
                                                            style={{
                                                                width: '250px',
                                                                height: '35px',
                                                                padding: '8px 8px',
                                                                border: 'none',
                                                                boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.8' : '0.4'})`,
                                                                borderRadius: '4px',
                                                                fontSize: '17px'
                                                            }}
                                                            onChange={(event) => this.setState({ districtSearchVal: event.target.value })}
                                                            onFocus={() => this.setState({ disableTypingAnimation: true })}
                                                            onBlur={() => this.setState({ disableTypingAnimation: false })}
                                                        />
                                                        {
                                                            this.state.disableTypingAnimation ? <></> :
                                                                <Typical
                                                                    steps={this.state.animatedDistrict}
                                                                    loop={Infinity}
                                                                    wrapper="span" />
                                                        }
                                                    </>
                                                }

                                            </Translation>

                                        </div>
                                        <div className="table-containers" style={{
                                            marginTop: '20px'
                                        }}>
                                            <div style={{ flexBasis: '100%', textAlign: 'center' }}><span style={{
                                                fontSize: '14px', color: `${this.props.isDark ? 'skyblue' : 'blue'}`,
                                                textTransform: 'uppercase',
                                                marginTop: '10px'
                                            }}>
                                                {this.state.districtData.length + " "}
                                                <Translation>
                                                    {t => t('Districts Affected')}
                                                </Translation>
                                            </span>
                                            </div>
                                            <table className='tfs-table state-dist-table' style={{
                                                background: `${this.props.isDark ? '#1e1d21' : '#fff'}`,
                                                boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.4' : '0.16'})`,
                                                marginBottom: "28px"
                                            }}>
                                                <thead style={{
                                                    background: `${this.props.isDark ?
                                                        'rgb(50, 58, 70)' : 'rgb(208, 206, 206)'}`, fontWeight: 'bold'
                                                }}>
                                                    <Translation>
                                                        {
                                                            t => <tr>
                                                                <th></th>
                                                                <th>{t("District")}</th>
                                                                <th>{t("INFECTED")}</th>
                                                                <th>{t("RECOVERED")}</th>
                                                                <th>{t("DEATHS")}</th>
                                                            </tr>
                                                        }
                                                    </Translation>

                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.showDistrictData !== undefined &&
                                                        this.state.showDistrictData.map((obj, index) => {
                                                            return (
                                                                <tr key={obj.district}
                                                                    style={{
                                                                        background: `${this.props.location.district === obj.district ?
                                                                            'rgb(119, 156, 156)' : index % 2 !== 0 ? this.props.isDark ? '#262529' :
                                                                                '#e4e0e0' : 'transparent'}`,
                                                                        color: `${this.props.location.district === obj.district && '#000 !important'}`,
                                                                        fontWeight: `${this.props.location.district === obj.district && 'bold'}`,
                                                                    }}
                                                                >
                                                                    <td>
                                                                        <div>&nbsp;</div>
                                                                        <i className="fa fa-caret-right"
                                                                            style={{
                                                                                fontWeight: 'bolder',
                                                                                fontSize: '17px',
                                                                                color: `${this.props.isDark ? 'aqua' : 'darkblue'}`,
                                                                            }}
                                                                        ></i>
                                                                    </td>
                                                                    <td>
                                                                        <div>&nbsp;</div>
                                                                        <Translation>
                                                                            {t => t(obj.district)}
                                                                        </Translation>
                                                                        {/* {obj.district} */}
                                                                    </td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <div style={{
                                                                        }}> <i style={{
                                                                            color: '#00b5ff',
                                                                            fontWeight: 'normal',
                                                                            fontSize: '12px',
                                                                            visibility: `${obj.delta.confirmed > 0 ? 'visible' : 'hidden'}`,
                                                                        }} className="fa fa-arrow-up">
                                                                                {obj.delta.confirmed.toLocaleString()}</i>
                                                                        </div>
                                                                        {obj.confirmed.toLocaleString()}</td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <div style={{
                                                                        }}> <i style={{
                                                                            color: `${this.props.isDark ? 'lightgreen' : 'green'}`,
                                                                            fontWeight: 'normal',
                                                                            fontSize: '12px',
                                                                            visibility: `${obj.delta.recovered > 0 ? 'visible' : 'hidden'}`,
                                                                        }} className="fa fa-arrow-up">
                                                                                {obj.delta.recovered.toLocaleString()}</i>
                                                                        </div>
                                                                        {obj.recovered.toLocaleString()}</td>
                                                                    <td style={{ textAlign: 'center' }}>
                                                                        <div style={{
                                                                        }}> <i style={{
                                                                            color: 'red',
                                                                            fontWeight: 'normal',
                                                                            fontSize: '12px',
                                                                            visibility: `${obj.delta.deceased > 0 ? 'visible' : 'hidden'}`,
                                                                        }} className="fa fa-arrow-up">
                                                                                {obj.delta.deceased.toLocaleString()}</i>
                                                                        </div>
                                                                        {obj.deceased.toLocaleString()}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Fragment>
                                : <StatesDashboardGraphs stateName={this.state.stateName}
                                    isDark={this.props.isDark}
                                    districtData={this.state.districtData}
                                />
                        }
                    </div>
                    <Footer />
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isDark: state.theme.isDark,
        location: state.users.location
    }
}

export default connect(mapStateToProps, null)(StatesDashboard)
