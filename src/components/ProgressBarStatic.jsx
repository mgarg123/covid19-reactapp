import React, { Fragment } from 'react'

export default function ProgressBarStatic(props) {
    return (
        <Fragment>
            <div className="progress-bar">
                <hr
                    className="prog-bar"
                    style={{ border: `2.7px solid ${props.bgColor}`, borderRadius: 4 }}
                />
            </div>
        </Fragment>
    )
}
