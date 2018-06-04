import React from 'react'

const Modal = props => {
    return (

        <div className="modal bd-example-modal-sm" role="dialog" id="newModal" >
            <div className="modal-dialog modal-sm modal-dialog-relative">
                <div className="modal-content ">
                    <button type="button" className="btn btn-light font" style={{ width: "100px", height: "75px" }}>Folder</button>
                    <button type="button" className="btn btn-light font" style={{ width: "100px", height: "75px" }}>File</button>
                </div>

            </div>
        </div>

    )
}

export default Modal