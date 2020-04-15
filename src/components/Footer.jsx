import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Footer extends Component {
    render() {
        return (
            <div className="footer" >
                <ul className="navbar-footer" style={{
                    width: '100%'
                }}>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/about-corona"><li>About Corona</li></Link>
                    <Link to="/corona-patients-in-world"><li>World Data</li></Link>
                    <Link to="/donate"><li>Donate</li></Link>
                </ul>
                <div className="footer-left">
                    <span>&copy;2020 All Rights Reserved</span>
                </div>
                <div className="footer-right">
                    <span>
                        <a href="https://linkedin.com/in/imgarg" target="new">Developed by Manish Garg.</a>
                    </span>
                </div>
            </div>
        )
    }
}

export default Footer
