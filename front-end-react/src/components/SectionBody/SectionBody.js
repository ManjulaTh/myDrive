import React, { Fragment } from 'react'
import FolderCard from './Cards/FoldeCard'
import FileCard from './Cards/FileCard'

const sectionBody = props => {
    let folderTitle
    let fileTitle
    let folders
    let files
    let myDriveFolders = []
    let myDriveFiles = []
    let trashFolders = []
    let trashFiles = []
    let fileSection
    let folderSection

    { console.log('from sec-body', props.folders) }
    {
        props.folders.map(folder => {

            if (folder.trash) {

                trashFolders = [...trashFolders, folder]
                folder.files.map(file => {
                    trashFiles = [...trashFiles, file]
                })
            } else {
                myDriveFolders = [...myDriveFolders, folder]
                folder.files.map(file => {
                    if (file.trash) {
                        trashFiles = [...trashFiles, file]
                    } else {
                        myDriveFiles = [...myDriveFiles, file]
                    }
                })

            }

        })
    }

    { console.log('trashFolders', trashFolders) }

    switch (props.section) {
        case 'trash':
            folderTitle = 'Deleted Folders'
            fileTitle = 'Deleted Files'
            folders = trashFolders
            files = trashFiles
            break
        case 'myDrive':
            folderTitle = 'Folders'
            fileTitle = 'Files'
            folders = myDriveFolders
            files = myDriveFiles
    }
    { console.log('files from_sec-body', myDriveFiles) }

    return (
        <Fragment>
            <section className="section-folder-body ">
                <p className="font font-weight-light"> {folderTitle}</p>
                <div id="FolderDiv d-flex align-items-start flex-row " style={{ width: "100%" }}>
                    <div className="card-deck mt-3 mb-5 d-flex align-items-start flex-row" style={{ width: "100%", height: "40px" }}>
                        {folders.map(folder => <FolderCard key={folder.folderName} folderName={folder.folderName} />)}
                    </div>
                </div>
            </section>
            <section className="section-folder-body ">
                <p className="font font-weight-light">{fileTitle}</p>
                <div id="FileDiv d-flex align-items-start flex-row" style={{ width: "100%" }}>
                    <div className="card-deck  mt-3 d-flex align-items-start flex-row" style={{ width: "100%", height: "130px" }}>
                        {files.map(file => <FileCard key={file.fileName} fileName={file.fileName} />)}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
export default sectionBody