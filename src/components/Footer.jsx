import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Footer extends Component {
    render() {
        return (
            <div className="footer" >
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
