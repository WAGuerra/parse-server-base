import React from "react"
import HtmlStatusPage from "./HtmlStatusPage"
import {Button} from '@material-ui/core';
import {navigate} from 'hookrouter';
import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        homeButton: {
            margin: `${theme.spacing(3)}px 0`
        }
    })
)

const UnableToConnectToServer: React.FC = () => {
    const classes = useStyles()
    return (
        <HtmlStatusPage
            title={"Opa!"}
            message={"Servidor não responde. Verifique sua conexão."}
            suggestedActions={
                <Button className={classes.homeButton} variant={"outlined"} color={"primary"}
                        onClick={() => navigate('/', true)}>
                    Recarregar Página principal
                </Button>
            }
        />
    )
}

export default UnableToConnectToServer
