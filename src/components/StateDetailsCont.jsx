import React, { Component } from 'react'
import StateDetailsBox from './StateDetailsBox'
import axios from 'axios'

export class StateDetailsCont extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stateData: [],
            recovered: "",
            deaths: "",
            confirmed: "",
            active: "",
            affectedState: 0
        }
    }

    componentDidMount() {
        let url = "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
        axios.get(url).then(response => {
            let data = response.data.data
            this.setState({
                stateData: data.statewise,
                recovered: data.statewise[0].recovered,
                confirmed: data.statewise[0].confirmed,
                deaths: data.statewise[0].deaths,
                active: data.statewise[0].active
            })

        }).catch(error => {
            console.log(error.message)
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.stateName !== prevProps.stateName) {
            for (let i in this.state.stateData) {
                if (this.state.stateData[i].state.toLowerCase() === this.props.stateName.toLowerCase()) {
                    this.setState({
                        confirmed: this.state.stateData[i].confirmed,
                        recovered: this.state.stateData[i].recovered,
                        deaths: this.state.stateData[i].deaths,
                        active: this.state.stateData[i].active
                    })
                }
            }
        }
        if (this.state.stateData !== prevState.stateData) {
            let count = 0
            for (let i in this.state.stateData) {
                if (this.state.stateData[i].confirmed !== 0) {
                    count++
                }
            }
            this.setState({ affectedState: count })
            this.props.stateDataCallBack(this.state.stateData, this.state.affectedState)
        }
        if (this.state.affectedState !== prevState.affectedState) {
            this.props.stateDataCallBack(this.state.stateData, this.state.affectedState)
        }
    }

    render() {
        return (
            <div className="state-details-cont">
                <div className="state-name" >
                    <span style={{ fontSize: 16 }}>
                        {this.props.stateName !== "" && this.props.stateName.toLowerCase().replace(/\b(\w)/g, x => { return x.toUpperCase(); })}
                    </span>
                </div>
                <div className="state-details">
                    <StateDetailsBox color={"rgb(1, 176, 230)"} title={"CNF"} val={this.state.confirmed} isDark={this.props.isDark} />
                    <StateDetailsBox color={"rgb(42, 180, 7)"} title={"REC"} val={this.state.recovered} isDark={this.props.isDark} />
                    <StateDetailsBox color={"red"} title={"DTH"} val={this.state.deaths} isDark={this.props.isDark} />
                    <StateDetailsBox color={"rgb(196, 4, 221)"} title={"ACT"} val={this.state.active} isDark={this.props.isDark} />
                </div>
            </div>

        )
    }
}

export default StateDetailsCont
