import React, { Component } from 'react'
import NavPill from './NavPill/NavPill'

class Navbar extends Component {
    render() {
        return (
            <div className="container float-sm-left ">
                <nav className="navbar bg-light  w-25 justify-content-center">
                    <div className="d-flex flex-column h-25">

                        {this.props.links.map(link => (
                            <NavPill
                                name={link.name}
                                title={link.title}
                                image={link.image}
                                url={link.url}
                                dataToggle={link.dataToggle}
                                dataTarget={link.dataTarget}
                            />
                        ))}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar