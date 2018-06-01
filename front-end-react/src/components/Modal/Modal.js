import React from 'react'

const Modal = props => {
    return (
        // <div style={{ position: "absolute" }}>
        <div className="modal fade " id="newModal" >

            <div class="modal-dialog modal-sm " role="document">
                <div class="modal-content">
                    <button type="button" class="btn btn-light" style={{ width: "100px", height: "75px" }}>Folder</button>
                    <button type="button" class="btn btn-light" style={{ width: "100px", height: "75px" }}>File</button>
                </div>
            </div>
            {/* </div> */}
        </div>

    )
}

export default Modal