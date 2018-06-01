import React, { Component } from 'react'
import NavPill from './NavPill/NavPill'

class Navbar extends Component {
    render() {
        return (
            <div className="float-sm-left">
                <nav className="navbar bg-light  w-25">
                    <div className="d-flex flex-column h-25">

                        {this.props.buttons.map(button => (
                            <NavPill
                                title={button.title}
                                image={button.image}
                            />
                        ))}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar