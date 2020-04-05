import React, { Component, Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import HeaderTab from './HeaderTab'
import '../css/about.css'


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
                    background: `${this.state.isDarkMode ? "#262626" : "#fff"}`,
                    color: `${this.state.isDarkMode ? '#fff' : '#000'}`
                }}>
                    <Header isDarkCallBack={this.isDarkModeActive} />
                    <HeaderTab tabs={["Overview", "Symptoms", "Prevention"]} tabClickedCallBack={this.whichTab} />
                    <div className="about-content container"
                        style={{ display: `${this.state.isAbout ? 'block' : 'none'}` }}>
                        <p>Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.
                            <br /></p>
                        <p>Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.&nbsp; Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.<br /></p>
                        <p>The best way to prevent and slow down transmission is be well informed about the COVID-19 virus, the disease it causes and how it spreads. Protect yourself and others from infection by washing your hands or using an alcohol based rub frequently and not touching your face.&nbsp; </p>
                        <p>The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).</p>
                        <p>At this time, there are no specific vaccines or treatments for COVID-19. However, there are many ongoing clinical trials evaluating potential treatments. WHO will continue to provide updated information as soon as clinical findings become available.<br /></p>
                        <p>Stay informed:<br /></p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                    </div>
                    <div className="symptom-content about-content container"
                        style={{ display: `${this.state.isSymptom ? 'block' : 'none'}` }}>
                        <p>The COVID-19 virus affects different people in different ways.&nbsp; COVID-19 is a respiratory disease and most infected people will develop mild to moderate symptoms and recover without requiring special treatment.&nbsp; People who have underlying medical conditions and those over 60 years old have a higher risk of developing severe disease and death.</p><p>Common symptoms include:</p>
                        <ul>
                            <li>fever</li>
                            <li>tiredness</li>
                            <li>dry cough.</li>
                        </ul>
                        <p>Other symptoms include:</p>
                        <ul>
                            <li>
                                shortness of breath</li>
                            <li>aches and pains</li>
                            <li>sore throat</li>
                            <li>and very few people will report diarrhoea, nausea or a runny nose.</li>
                        </ul>
                        <p>People with mild symptoms who are otherwise healthy should self-isolate and contact their medical provider or a COVID-19 information line for advice on testing and referral.</p>
                        <p>People with fever, cough or difficulty breathing should call their doctor and seek medical attention.
                            </p><p>&nbsp;</p>

                    </div>
                    <div className="prevention-content about-content container"
                        style={{ display: `${this.state.isAbout === false && this.state.isSymptom === false ? 'block' : 'none'}` }}>
                        <p>To prevent infection and to slow transmission of COVID-19, do the following:</p>
                        <ul>
                            <li>Wash your hands regularly with soap and water, or clean them with alcohol-based hand rub.<br />
                            </li>
                            <li>Maintain at least 1 metre distance between you and people coughing or sneezing.<br /></li>
                            <li>Avoid touching your face.<br /></li>
                            <li>Cover your mouth and nose when coughing or sneezing.<br /></li>
                            <li>Stay home if you feel unwell.<br /></li>
                            <li>Refrain from smoking and other activities that weaken the lungs.<br /></li>
                            <li>Practice physical distancing by avoiding unnecessary travel and staying away from large groups of people.<br /><br /></li>
                        </ul>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Coronavirus_COVID-19_prevention.svg"
                            alt="Covid-prevention"
                        />
                    </div>

                    <Footer />
                </div>
            </Fragment>
        )
    }
}

export default AboutCorona
