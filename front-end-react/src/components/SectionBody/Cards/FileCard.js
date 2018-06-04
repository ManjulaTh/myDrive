import React from 'react'
import fileIcon from '../../../img/file.png'

const FileCard = props => {
    return (
        <div className="card-deck wrap d-flex justify-content-center " style={{ width: "200px", height: "75px" }}>
            <div className="card">
                <img className="card-img-top" src={fileIcon} alt="Card image cap" />
                <h2>{props.fileName}</h2>
            </div>
        </div>
    )
}

export default FileCard


