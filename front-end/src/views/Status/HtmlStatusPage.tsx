import React, {ReactElement} from "react"
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {Button, Grid, Typography} from "@material-ui/core"
import {navigate} from "hookrouter"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center",
            padding: `${theme.spacing(16)}px 0 !important`
        },
        homeButton: {
            margin: `${theme.spacing(3)}px 0`
        }
    })
)

type HtmlStatusPageProps = {
    title: string,
    message: string,
    suggestedActions?: ReactElement | React.FC,
    htmlStatusCode?: number
}

const HtmlStatusPage: React.FC<HtmlStatusPageProps> = (props) => {
    const classes = useStyles()
    const {
        title,
        message,
        suggestedActions,
        htmlStatusCode,
    } = props

    return (
        <Grid container justify={"center"} className={classes.root}>
            <Grid item xs={12}>
                <Typography variant={"h1"} color={"primary"} gutterBottom>
                    <small>{htmlStatusCode}</small> {title}
                </Typography>
                <Typography variant={"body1"} gutterBottom>
                    {message}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {suggestedActions ||
                <Button className={classes.homeButton} variant={"outlined"} color={"primary"}
                        onClick={() => navigate('/', true)}>
                    Voltar à página principal
                </Button>
                }
            </Grid>
        </Grid>
    )
}

export default HtmlStatusPage
