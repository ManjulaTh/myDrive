import React from 'react'
import fileIcon from '../../../img/file.png'

import Card from "material-ui/Card";
import CardContent from '@material-ui/core/CardContent'
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import { withStyles } from '@material-ui/core/styles'

const styles = {
    cardAction: {
        display: 'block',
        textAlign: 'center'
    },
    cardContent: {
        align: 'center',
        maxWidth: '120px',
        height: '110px',
    },
    card: {
        marginTop: '10px',
        marginRight: '20px',
        padding: '0px'
    }
}

const FileCard = props => {
    return (
        <Card className={props.classes.card} raised="true">
            <ButtonBase
                className={props.classes.cardAction}
                onClick={props.clicked}
            >

                <CardContent className={props.classes.cardContent}>
                    <img className="card-img-top mb-1" style={{ width: "80px", height: "60px" }} src={fileIcon} alt="Card image cap" />
                    <p className="font">{props.fileName}</p>
                </CardContent>
            </ButtonBase>
        </Card >
    );
}

export default withStyles(styles)(FileCard)
