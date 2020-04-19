import React, { Fragment, useEffect, Suspense } from 'react'
import CaseNumber from './components/CaseNumber'
import Footer from './components/Footer'
import Header from './components/Header'
import { useState } from 'react'
import HeaderTab from './components/HeaderTab'
import StateTable from './components/StateTable'
import axios from 'axios'
import '../src/css/plot.css'
import Graphs from './components/Graphs'
import Predictions from './components/Predictions'
import Loader from './components/Loader'
// import SamplesTested from './components/SamplesTested'




function App(props) {
    //eslint-disable-next-line
    const [isDarkMode, setDarkMode] = useState(true)
    const [isStatsClicked, setStatsClicked] = useState(true)
    const [isStatewiseClicked, setStatewiseClicked] = useState(false)
    const [isGraphsClicked, setGraphsClicked] = useState(false)
    const [stateData, setStateData] = useState([])
    const [affectedState, setAffectedState] = useState(0)
    const [stats, setStats] = useState({})
    const [keyValues, setKeyValues] = useState({})    //For Setting last updated and todays data
    const [lastUpdated, setLastUpdated] = useState("")
    const [districtDatas, setDistrictDatas] = useState([])


    function isDarkModeActive(isDark) {
        setDarkMode(isDark)
    }

    function whichTab(isStat, isState, isGraphs) {
        setStatsClicked(isStat)
        setStatewiseClicked(isState)
        setGraphsClicked(isGraphs)
    }

    useEffect(() => {
        //API call for Stats
        // let url = "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
        let url = "https://api.covid19india.org/data.json"
        axios.get(url).then(response => {
            // var data = response.data.data
            let data = response.data

            // let conf = data.total.confirmed
            // let rec = data.total.recovered
            // let death = data.total.deaths
            // let act = data.total.active

            let conf = data.statewise[0].confirmed
            let rec = data.statewise[0].recovered
            let death = data.statewise[0].deaths
            let act = data.statewise[0].active

            let stat = {
                confirmed: conf,
                recovered: rec,
                deaths: death,
                active: act
            }

            let statesData = []
            let count = 0
            for (let i in data.statewise) {
                if (data.statewise[i].statecode !== 'TT') {
                    let obj = {
                        active: parseInt(data.statewise[i].active),
                        confirmed: parseInt(data.statewise[i].confirmed),
                        deaths: parseInt(data.statewise[i].deaths),
                        deltaconfirmed: parseInt(data.statewise[i].deltaconfirmed),
                        deltadeaths: parseInt(data.statewise[i].deltadeaths),
                        deltarecovered: parseInt(data.statewise[i].deltarecovered),
                        lastupdatedtime: data.statewise[i].lastupdatedtime,
                        recovered: parseInt(data.statewise[i].recovered),
                        state: data.statewise[i].state,
                        statecode: data.statewise[i].statecode,
                        statenotes: data.statewise[i].statenotes
                    }
                    statesData.push(obj)
                }

                if (parseInt(data.statewise[i].confirmed) !== 0 && data.statewise[i].statecode !== 'TT') {
                    count++
                }
            }

            let obj = data.statewise[0]    //this obj has lastupdatedtime,deceaseddelta,confirmeddelta,reecovereddelta

            //Setting up Last Updated Time
            let lastUpTime = obj.lastupdatedtime.split(" ")[1].split(":")

            let time = new Date()
            let currHour = time.getHours()
            let currMin = time.getMinutes()

            if ((currHour - parseInt(lastUpTime[0]) === 0) && (currMin - parseInt(lastUpTime[1]) >= 0)) {
                setLastUpdated(Math.abs(currMin - parseInt(lastUpTime[1])) + " Minutes")
            }
            else if ((currHour - parseInt(lastUpTime[0]) !== 0) && (currMin < parseInt(lastUpTime[1]))) {
                setLastUpdated(60 - Math.abs(currMin - parseInt(lastUpTime[1])) + " Minutes")
            } else {
                setLastUpdated("About " + Math.abs(currHour - parseInt(lastUpTime[0])) + " Hours")
            }

            setKeyValues(obj)       //Daily Confirmed,deaths and recovred data


            setStats(stat)
            setAffectedState(count)
            setStateData(statesData)


        }).catch(error => {
            console.log(error.message)
        })

        //API call for District wise  Data
        let url3 = "https://api.covid19india.org/v2/state_district_wise.json"
        axios.get(url3).then(response => {
            let data = response.data
            setDistrictDatas(data)

        }).catch(error => console.log(error.message))


        return () => {

        }
    }, [])




    return (
        <Fragment>
            <Suspense fallback={Loader}>
                <div className="site-holder" style={{
                    background: `${localStorage.getItem('ncovindia_isDark') === 'true' ? "#262626" : "#fff"}`,
                    color: `${localStorage.getItem('ncovindia_isDark') === 'true' ? '#fff' : '#2d2d2d'}`
                }}>
                    <Header isDarkCallBack={isDarkModeActive} />
                    <HeaderTab tabs={["Stats", "Lists", "Graphs", "Prediction"]} tabClickedCallBack={whichTab} />
                    {
                        isStatsClicked ? <><CaseNumber isDark={localStorage.getItem('ncovindia_isDark') === 'true'}
                            stats={stats} keyVals={keyValues}
                            lastUpdated={lastUpdated} /></> :
                            isStatewiseClicked ? <StateTable
                                stateData={stateData}
                                affectedState={affectedState}
                                districtDatas={districtDatas}
                                isDark={localStorage.getItem('ncovindia_isDark') === 'true'} /> : isGraphsClicked ?
                                    <Graphs isDark={localStorage.getItem('ncovindia_isDark') === 'true'} /> :
                                    <Predictions isDark={localStorage.getItem('ncovindia_isDark') === 'true'} />

                    }
                    <Footer isDark={localStorage.getItem('ncovindia_isDark') === 'true'} />
                </div>
            </Suspense>

        </Fragment>
    )
}

export default App
