import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div className="footer"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "30px",
                    background: "rgb(55, 44, 95)",
                    boxShadow: "1px 1px 6px 2px rgba(0,0,0,0.5)"
                }}>
                <h5 style={{ color: "#fff" }}>Powered by MG.</h5>
            </div>
        )
    }
}

export default Footer
