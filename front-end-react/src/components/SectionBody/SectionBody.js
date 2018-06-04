import React from 'react'

const sectionBody = props => {
    let title
    if (props.section === 'trash') {
        title = 'Trash'
    } else {
        title = 'My Drive'
    }
    return (
        <section id='header-body'>

            <h3> {title}</h3>
        </section>

    )
}
export default sectionBody