import React from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {CircularProgress} from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center",
            padding: `${theme.spacing(20)}px 0`
        },
    })
)

const LoadingPage: React.FC = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <CircularProgress size={100}/>
        </div>
    )
}

export default LoadingPage
