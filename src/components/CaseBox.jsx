import React, { Component, Fragment } from 'react'
import ProgressBarStatic from './ProgressBarStatic'
import CaseBoxDetails from './CaseBoxDetails'
import Loader from './Loader'

export class CaseBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        return (
            <Fragment>
                <div className="total-numbers confirmed-number"
                    style={{
                        background: `${this.props.isDark ? '#323A46' : '#fff'}`,
                        color: `${this.props.isDark ? '#fff' : '#222'}`
                    }}>
                    <div className="number-details">
                        <div id="number-details-heading">{this.props.title}</div>
                        {
                            this.props.val !== "" ? <CaseBoxDetails
                                bgColor={this.props.bgColor}
                                title={this.props.title}
                                val={this.props.val}
                                todayDelta={this.props.todayDelta}
                                conf={this.props.conf}
                                isDark={this.props.isDark} /> : <Loader isDark={this.props.isDark} />
                        }


                        <ProgressBarStatic bgColor={this.props.bgColor} />
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CaseBox
