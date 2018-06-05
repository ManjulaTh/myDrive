import React from 'react'

const Modal = props => {
    return (

        <div className="modal bd-example-modal-sm" role="dialog" id="newModal" >
            <div className="modal-dialog modal-sm modal-dialog-relative">
                <div className="modal-content position-relative">
                    <button type="button" className="btn btn-light font w-100" >Folder</button>
                    <button type="button" className="btn btn-light font w-100">File</button>
                </div>

            </div>
        </div>

    )
}

export default Modal