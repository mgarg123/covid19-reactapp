import React, { Component, Fragment } from 'react'
import Footer from './Footer'
import Header from './Header'
import '../css/index.css'

export class Donate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taglines: ["Donate for a good cause.", "Small charities can bring bigger impacts.", "Your healing begins with charity.",
                "Be the change.", "Rebuilding lives for futures.", "Make someone’s life by giving of yours."],
            currentTagline: "Donate for a good cause.",
            isDark: true
        }
    }
    componentDidMount() {
        setInterval(() => {
            let currTagline = this.state.taglines[Math.floor(Math.random() * this.state.taglines.length)]
            this.setState({ currentTagline: currTagline })
        }, 4000)
    }

    isDarkModeActive = (isDark) => {
        this.setState({ isDark: isDark })
    }



    render() {
        return (
            <Fragment>
                <Header isDarkCallBack={this.isDarkModeActive} />
                <div className="donation-container" style={{
                    background: `${localStorage.getItem('ncovindia_isDark') === 'true' ?
                        '#262626' : '#fff'}`,
                    color: `${localStorage.getItem('ncovindia_isDark') === 'true' ?
                        '#fff' : '#222'}`,
                    paddingBottom: '60px'
                }}>

                    <div className="donation-subcontainer">
                        <div className="taglines-container" style={{
                            background: `linear-gradient(to right,${this.state.isDark ? '#007991, #78ffd6' : '#1A2980,#26D0CE'})`,

                        }}>
                            <div className="taglines-box">
                                <div>{this.state.currentTagline}</div>
                            </div>
                        </div>
                        <div className="donate-now">
                            <div className="donate-now-title">
                                <div style={{
                                    border: '0.5px solid grey', padding: '5px',
                                    borderRadius: '6px',
                                    background: 'linear-gradient(to right,#000428,#004e92)',
                                    color: '#fff'
                                }}>
                                    <p >Contribute your part. Help the people in need. Your single contribution will play a major role in
                                    saving the life of people who are mostly affected by this pandemic. Donate for a Good Cause.
                                </p>
                                    <p >
                                        You can donate money using various payment methods available below.
                                </p>
                                </div>

                                <p style={{
                                    marginTop: '15px', border: '0.6px solid grey',
                                    padding: '5px 5px', borderRadius: '5px',
                                    background: 'linear-gradient(to right,#44A08D,#093637)',
                                    color: '#fff'
                                }}>
                                    <span style={{ fontWeight: 'bold' }}>Note:</span> The payment details provided here in this page are
                                    authentic and is verified government's official account details.
                                </p>

                                <p style={{ padding: '10px 0px', fontWeight: 'bold' }}>Choose any from below payment methods to pay:</p>
                            </div>
                            <div style={{
                                width: '83%', margin: '0 auto',
                                background: 'linear-gradient(to right,#ff9966,#ff5e62)',
                                borderRadius: '4px'
                            }}>
                                <span >
                                    <span style={{ fontWeight: "bold", fontSize: '17px', paddingLeft: '2px' }}>1. UPI</span>
                                    <p style={{ fontWeight: '400', fontSize: '13px', textAlign: 'left', paddingLeft: '22px' }}>
                                        Pay using any UPI App like Google Pay, PhonePe, Paytm, BHIM UPI etc.
                                        Click the below button and choose your preferred app to pay.
                                    </p>
                                </span>
                                <div style={{ textAlign: 'center', width: '100%', padding: '13px 0px' }}>
                                    <button id="donate-btn">
                                        <a href="upi://pay?pa=pmcares@sbi&pn=Pm+cares&tn=undefined&am=undefined">
                                            Pay Through UPI
                                    </a>
                                    </button>
                                </div>

                            </div>

                            <div style={{
                                width: '83%', margin: '0 auto',
                                background: 'linear-gradient(to right,#36D1DC,#5B86E5)',
                                borderRadius: '4px',
                                marginTop: "10px"
                            }}>
                                <span >
                                    <span style={{
                                        fontWeight: "bold", fontSize: '17px',
                                        paddingLeft: '2px'
                                    }}>2. Bank Transfer</span>
                                    <p style={{ fontWeight: '400', fontSize: '13px', textAlign: 'left', paddingLeft: '22px' }}>
                                        You can use the below Account details to transfer money directly to the
                                        Bank Account using IMPS, NEFT, RTGS or other money trasnfer facilities.
                                        Click on the below button to get the Account Details.
                                    </p>
                                </span>
                                <div style={{ textAlign: 'center', width: '100%', padding: '20px 0px' }}>
                                    <button id="donate-btn" onClick={() => this.setState({ showBankDetails: !this.state.showBankDetails })}>
                                        <a href="#bank-details">{this.state.showBankDetails ? 'Hide ' : 'Show '} Bank Details</a>
                                    </button>
                                </div>
                                <div style={{ display: `${this.state.showBankDetails ? 'block' : 'none'}` }} id="bank-details">
                                    <div><span className='bnk-title'>Account Name</span>
                                        <span style={{ padding: '0px 2px 0px 22px' }}>:</span>
                                        <span>PM CARES</span></div>
                                    <div><span className='bnk-title'> Account Number</span>
                                        <span style={{ padding: '0px 0px 0px 8px' }}>:</span>
                                        <span>2121PM20202</span></div>
                                    <div><span className='bnk-title'>IFSC Code</span>
                                        <span style={{ padding: '0px 2px 0px 51px ' }}>:</span>
                                        <span>SBIN0000691</span></div>
                                    <div><span className='bnk-title'>Bank Name:</span>
                                        <span style={{ padding: '0px 2px 0px 39px ' }}>:</span>
                                        <span>State Bank Of India</span></div>
                                    <div><span className='bnk-title'>Branch</span>
                                        <span style={{ padding: '0px 0px 0px 73px ' }}>:</span>
                                        <span>Main, New Delhi</span></div>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default Donate
