import React, { Fragment } from 'react'
import '../css/loader.css'

export default function Loader() {
    return (
        <Fragment>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </Fragment>
    )
}
