import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

<Button variant="raised" component={Link} to={props.url}>
    Trash
          <Delete className="iconlarge" style={{ marginRight: theme.spacing.unit }} />
</Button>

function IconLabelButtons(props) {
    const { classes } = props;
    return (
        <div>
            <Button className={classes.button} variant="raised" color="secondary">
                Delete
          <Delete className={classNames(classes.leftIcon, classes.iconSmall)} />
            </Button>
        </div>
    )
}