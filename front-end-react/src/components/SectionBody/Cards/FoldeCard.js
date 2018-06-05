import React from 'react'
import folderImage from '../../../img/folder.png'

import Card from "material-ui/Card"
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ButtonBase from "@material-ui/core/ButtonBase"
import Typography from "@material-ui/core/Typography"
import { withStyles } from '@material-ui/core/styles'

const styles = {
    cardAction: {
        display: 'block',
        textAlign: 'center'
    },
    cardContent: {

        direction: 'row',
        justify: 'center',
        alignItems: 'center',
        minWidth: '190px',
        height: '30px',
        display: 'flex',

    },
    card: {
        marginTop: '10px',
        marginRight: '20px',
        padding: '0px'
    },
    cover: {
        minwidth: '25px',
        height: '25px'
    },
    grid: {
        display: 'flex',
        wrap: 'wrap',
        width: '100px'
    }
}

const FolderCard = props => {
    const { classes } = props;
    return (
        <div className="grid" layout="horizontal" layout-align="center center">
            <Card className={classes.card} raised="true">
                <ButtonBase
                    className={classes.cardAction}
                //   onClick={event => { ... }}
                >

                    <CardContent className={classes.cardContent}>
                        <div>
                            <img style={{ width: "25px", height: "25px" }} src={folderImage} alt="Card image cap" />

                        </div>
                        <p className="font m-0 pl-1 ">{props.folderName}</p>
                    </CardContent>
                </ButtonBase>
            </Card >
        </div>
    );
}

export default withStyles(styles)(FolderCard)
