import React, { Component } from 'react'
import NavPill from './NavPill/NavPill'

class Navbar extends Component {
    render() {
        return (
            <div id="wrapper">
                <div className="container float-sm-left" >
                    <nav className="navbar bg-light justify-content-center">
                        <div className="d-flex flex-column h-25">

                            {this.props.links.map(link => (
                                <NavPill
                                    key={link.name}
                                    name={link.name}
                                    title={link.title}
                                    image={link.image}
                                    url={link.url}
                                    dataToggle={link.dataToggle}
                                    dataTarget={link.dataTarget}
                                    pillId={link.pillId}
                                />
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default Navbar