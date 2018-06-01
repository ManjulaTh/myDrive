import React, { Component } from 'react'


const Button = props => {
    let icon = { src: props.image }
    return (

        <button
            type="button"
            className="btn btn-light btn-lg btn-block font-weight-light d-inline-flex "
            style={{ height: "50px", width: "150px" }}>
            <div className="d-flex justify-content-right">
                <img style={{ height: "30px", width: "30px" }} src={`${props.image}`} />
                <h6 className="m-1">{props.title}</h6>
            </div>
        </button>

    )
}

export default Button;