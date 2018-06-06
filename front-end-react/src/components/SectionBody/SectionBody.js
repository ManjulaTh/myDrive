import React, { Fragment } from 'react'
import FolderCard from './Cards/FoldeCard'
import FileCard from './Cards/FileCard'

const sectionBody = props => {
    let folderTitle
    let fileTitle

    let currentFileId
    let currentFolderId

    { console.log('from sec-body', props.folders) }
    { console.log('from sec-body', props.files) }

    switch (props.section) {
        case 'trash':
            folderTitle = 'Deleted Folders'
            fileTitle = 'Deleted Files'
            break
        case 'myDrive':
            folderTitle = 'Folders'
            fileTitle = 'Files'

    }

    return (
        <Fragment>
            <section className="section-folder-body ">
                <p className="font font-weight-light"> {folderTitle}</p>
                <div id="FolderDiv d-flex align-items-start flex-row " style={{ width: "100%" }}>
                    <div className="card-deck mt-3 mb-5 d-flex align-items-start flex-row" style={{ width: "100%", height: "40px" }}>
                        {props.folders.map(folder =>
                            <FolderCard
                                key={folder.name}
                                folderName={folder.name}
                                clicked={() => props.folderClicked(folder.id)}
                                doubleClicked={() => props.folderDoubleClicked(folder.id, folder.name)}
                            />
                        )}
                    </div>
                </div>
            </section>
            <section className="section-folder-body ">
                <p className="font font-weight-light">{fileTitle}</p>
                <div id="FileDiv d-flex align-items-start flex-row" style={{ width: "100%" }}>
                    <div className="card-deck  mt-3 d-flex align-items-start flex-row" style={{ width: "100%", height: "130px" }}>
                        {props.files.map(file =>
                            <FileCard
                                key={file.name}
                                fileName={file.name}
                                clicked={() => props.fileClicked(file.id)}
                            />
                        )}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default sectionBody