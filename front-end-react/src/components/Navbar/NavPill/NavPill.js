import React from 'react'
import classes from './NavPill.css'

const NavPill = props => {
    let cName
    let border

    switch (props.title) {
        case 'DriveStorage':
            cName = "nav-item nav-link disabled d-flex justify-content-center "
            break
        case 'NEW':
            cName = "nav-item nav-link d-flex justify-content-center shadow bg-white rounded {`${classes.rounded}`}"
            break
        default:
            cName = "nav-item nav-link d-flex justify-content-center"
            break
    }

    switch (props.title) {
        case 'NEW':
            border = { borderTopRightRadius: "50px", borderBottomRightRadius: "50px" }
            break
        default:
            border = { borderRadius: "50px" }
            break
    }

    return (
        // <section className={`${classes.rounded}`}>
        
             <nav
            className="nav nav-pills nav-fill nav-justified font-weight-light d-inline-flex m-3 "
            style={{ height: "50px", width: "150px" }}>
            <a className={cName}
                // style={{ border }}
                style={{ borderRadius: "25px" }}
                href={props.url}
                exact
                data-target={props.dataTarget}
                data-toggle={props.dataToggle}
            >
                <img style={{ height: "30px", width: "30px" }} src={`${props.image}`} />
                <h6 className="m-1 text-dark">{props.title}</h6>
            </a>
        </nav> 
      
        //  </section >
    )
}

export default NavPill;