import React, { Component } from 'react'
import i18n from '../localize/i18n'
export class Footer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            lang: localStorage.getItem('i18nextLng')
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.lang !== prevState.lang) {
            i18n.changeLanguage(this.state.lang)

        }
    }

    render() {
        return (
            <footer className="footer" >
                <div className="footer-lang" style={{ marginBottom: '5px' }}>
                    <button className="langs" onClick={() => this.setState({ lang: "en" })} >
                        <span style={{ color: `${this.state.lang === 'en' ? '#62d2d2' : '#fff'}`, fontWeight: 'bold' }}>English</span>
                    </button>
                    <button className="langs" onClick={() => this.setState({ lang: "hin" })}>
                        <span style={{ color: `${this.state.lang === 'hin' ? '#62d2d2' : '#fff'}`, fontWeight: 'bold' }}>हिन्दी</span>
                    </button>
                </div>
                <div className="footer-bottom">
                    <div className="footer-left">
                        <span>&copy;2020 All Rights Reserved</span>
                    </div>
                    <div className="footer-right">
                        <span>
                            <a href="https://linkedin.com/in/imgarg" target="new">Developed by Manish Garg.</a>
                        </span>
                    </div>
                </div>

            </footer >
        )
    }
}

export default Footer
