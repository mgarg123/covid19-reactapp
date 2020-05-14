import React, { Component, Fragment } from 'react'
import ProgressBarStatic from './ProgressBarStatic'
import CaseBoxDetails from './CaseBoxDetails'
import Loader from './Loader'
import { Translation } from 'react-i18next';

export class CaseBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
    componentDidMount() {
        // this.props.i18n.changeLanguage("hin")
    }

    render() {
        return (
            <Fragment>
                <div className={`total-numbers ${this.props.cls}`}
                    style={{
                        background: `${this.props.isDark ? '#262529' : '#fcfcfc'}`,
                        color: `${this.props.isDark ? '#fff' : '#222'}`,
                        boxShadow: `7px 7px 15px 1px rgba(0, 0, 0,${this.props.isDark ? '0.4' : '0.16'})`
                    }}>
                    <div className="number-details">
                        <div id="number-details-heading">
                            <Translation>
                                {t => <span>{t(this.props.title)}</span>}
                            </Translation>

                        </div>
                        {
                            this.props.val !== "" || this.props.val !== undefined ? <CaseBoxDetails
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
