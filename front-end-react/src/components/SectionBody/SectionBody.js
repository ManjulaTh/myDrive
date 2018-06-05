import React from 'react'
import FolderCard from './Cards/FoldeCard'
import FileCard from './Cards/FileCard'

const sectionBody = props => {
    let folderTitle
    let fileTitle
    let folders
    let files
    let myDriveFolders
    let myDriveFiles
    let trashFolders
    let trashFiles
    let fileSection
    let folderSection

    { console.log('from sec-body', props.folders) }
    {
        props.folders.map(folder => {

            if (folder.trash) {

                trashFolders = [{ ...trashFolders, folder }]
                folder.files.map(file => {
                    trashFiles = [{ ...trashFiles, file }]
                })
            } else {
                myDriveFolders = [{ ...myDriveFolders, folder }]
                folder.files.map(file => {
                    if (file.trash) {
                        trashFiles = [{ ...trashFiles, file }]
                    } else {
                        myDriveFiles = [{ ...myDriveFiles, file }]
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
            folders = typeof trashFolders !== 'undefined' && trashFolders ? trashFolders : []
            files = typeof trashFiles !== 'undefined' && trashFiles ? trashFiles : []
            break
        case 'myDrive':
            folderTitle = 'Folders'
            fileTitle = 'Files'
            folders = typeof myDriveFolders !== 'undefined' && myDriveFolders ? myDriveFolders : []
            files = typeof myDriveFiles !== 'undefined' && myDriveFiles ? myDriveFiles : []
    }
    { console.log('files from_sec-body', myDriveFiles) }

    return (
        <section id='header-body'>
            <p className="font font-weight-light"> {folderTitle}</p>
            <div id="FolderDiv">
                <div className="card-deck mt-3 mb-5" style={{ width: "200px", height: "40px" }}>
                    {folders.map(folder => <FolderCard key={folder.folder.folderName} folderName={folder.folder.folderName} />)}
                </div>
            </div>
            <p className="font font-weight-light">{fileTitle}</p>
            <div id="FileDiv d-flex fex-row">
                <div className="card-deck wrap d-flex flex-row justify-content-left mt-3" style={{ width: "150px", height: "140px" }}>
                    {files.map(file => <FileCard key={file.file.fileName} fileName={file.file.fileName} />)}
                </div>
            </div>
        </section>
    )
}
export default sectionBody