import React, { Component, Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import HeaderTab from './HeaderTab'
import '../css/about.css'
import { connect } from 'react-redux'
import { Translation } from 'react-i18next'


export class AboutCorona extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isDarkMode: true,
            isAbout: true,
            isSymptom: false
        }
    }

    whichTab = (isAbout, isSymptom) => {
        this.setState({ isAbout: isAbout, isSymptom: isSymptom })
    }

    isDarkModeActive = (isDark) => {
        this.setState({ isDarkMode: isDark })
    }


    render() {
        return (
            <Fragment>
                <div className="site-holder" style={{
                    background: `${this.props.isDark ? "#1e1d21" : "#ebebeb"}`,
                    color: `${this.props.isDark ? '#fff' : '#000'}`
                }}>
                    <Header isDarkCallBack={this.isDarkModeActive} />
                    <HeaderTab tabs={["Overview", "Symptoms", "Prevention"]} tabClickedCallBack={this.whichTab} />
                    <div className="about-content container"
                        style={{ display: `${this.state.isAbout ? 'block' : 'none'}` }}>
                        <p>
                            <Translation>
                                {t => t('aboutCoronaP1')}
                            </Translation>

                            <br /></p>
                        <p> <Translation>
                            {t => t('aboutCoronaP2')}
                        </Translation>
                            <br />
                        </p>
                        <p><Translation>
                            {t => t('aboutCoronaP3')}
                        </Translation> </p>
                        <p><Translation>
                            {t => t('aboutCoronaP4')}
                        </Translation> </p>
                        <p><Translation>
                            {t => t('aboutCoronaP5')}
                        </Translation><br /></p>
                        <p><Translation>
                            {t => t('aboutCoronaP6')}
                        </Translation><br /></p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="symptom-content about-content container"
                        style={{ display: `${this.state.isSymptom ? 'block' : 'none'}` }}>
                        <p><Translation>
                            {t => t('coronaSymptomsP1')}
                        </Translation></p><br />
                        <p><Translation>
                            {t => t('coronaSymptomsP2')}
                        </Translation></p>
                        <ul>
                            <li><Translation>
                                {t => t('fever')}
                            </Translation></li>
                            <li><Translation>
                                {t => t('tiredness')}
                            </Translation></li>
                            <li><Translation>
                                {t => t('dry cough')}
                            </Translation>.</li>
                        </ul><br />
                        <p><Translation>
                            {t => t('coronaSymptomsP3')}
                        </Translation></p>
                        <ul>
                            <li><Translation>
                                {t => t('shortness of breath')}
                            </Translation>
                            </li>
                            <li><Translation>
                                {t => t('aches and pains')}
                            </Translation></li>
                            <li><Translation>
                                {t => t('sore throat')}
                            </Translation></li>
                            <li><Translation>
                                {t => t('and very few people will report diarrhoea, nausea or a runny nose')}
                            </Translation>.</li>
                        </ul><br />
                        <p><Translation>
                            {t => t('coronaSymptomsP4')}
                        </Translation></p>
                        <p>
                        </p><Translation>
                            {t => t('coronaSymptomsP5')}
                        </Translation><p>&nbsp;</p>

                    </div>
                    <div className="prevention-content about-content container"
                        style={{ display: `${this.state.isAbout === false && this.state.isSymptom === false ? 'block' : 'none'}` }}>
                        <p>
                            <Translation>
                                {t => t('coronaPreventionP1')}
                            </Translation>
                        </p>
                        <ul>
                            <li><Translation>
                                {t => t('Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub.')}
                            </Translation><br />
                            </li>
                            <li><Translation>
                                {t => t('Maintain at least 1 metre distance between you and people coughing or sneezing.')}
                            </Translation><br /></li>
                            <li><Translation>
                                {t => t('Avoid touching your face.')}
                            </Translation><br /></li>
                            <li><Translation>
                                {t => t('Cover your mouth and nose when coughing or sneezing.')}
                            </Translation><br /></li>
                            <li> <Translation>
                                {t => t('Stay home if you feel unwell.')}
                            </Translation><br /></li>
                            <li> <Translation>
                                {t => t('Refrain from smoking and other activities that weaken the lungs.')}
                            </Translation><br /></li>
                            <li> <Translation>
                                {t => t('Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people.')}
                            </Translation><br /><br /></li>
                        </ul>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Coronavirus_COVID-19_prevention.svg"
                            alt="Covid-prevention"
                            style={{ marginBottom: '20px' }}
                        />
                    </div>

                    <Footer />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isDark: state.theme.isDark
    }
}

export default connect(mapStateToProps, null)(AboutCorona)
