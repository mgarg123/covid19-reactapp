import React, { Component } from 'react'
import PredictionTrends from './PredictionTrends'

export class Predictions extends Component {
    render() {
        return (
            <>
                <div style={{ marginTop: '20px', marginBottom: '50px' }}>
                    <div className="disclaimer" style={{ width: "100%" }}>
                        <div className="disclaimer-content" style={{
                            width: `93%`,
                            margin: '0 auto',
                            border: `0.4px solid ${this.props.isDark ? '#eee' : '#1c1c1c'}`,
                            padding: '8px',
                            textAlign: `${window.screen.width < 600 ? 'left' : 'center'}`
                        }}>
                            <span style={{ fontWeight: 'bold', fontSize: '15px' }}>Disclaimer: </span>
                            <span style={{ fontSize: '14px' }}> Below statistics are completely fictitous.
                            It's not actual data records,
                            but just a prediction from confirmed cases of covid 19 patients across the world.</span>
                        </div>

                    </div>
                    <PredictionTrends isDark={this.props.isDark} />
                </div>
            </>
        )
    }
}

export default Predictions
