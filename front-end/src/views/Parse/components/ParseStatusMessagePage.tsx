import React, {ReactElement} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import {useTitle} from "hookrouter";
//TODO incluir logo
// import logo from "../../../images/logo.svg"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center",
            top: 0,
            bottom: 0,
            position: "absolute"
        },
        homeButton: {
            margin: `${theme.spacing(3)}px 0`
        },
        logoContainer: {
            textAlign: "center"
        },
        logo: {
            margin: 10,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            [theme.breakpoints.down("xs")]: {
                width: 120,
                height: 120,
            },
            [theme.breakpoints.up("sm")]: {
                width: 180,
                height: 180
            }
        },
        gutterBottom: {
            marginBottom: 110
        }
    })
);

type ParseStatusMessagePageProps = {
    title: string,
    message?: string,
    child?: ReactElement
}

const ParseStatusMessagePage: React.FC<ParseStatusMessagePageProps> = (props) => {
    const classes = useStyles();
    const {
        title,
        message,
    } = props;
    useTitle(title);

    return (
        <Grid container justify={"center"} alignContent={"center"} className={classes.root} spacing={3}>
            {/*<Grid item xs={12} className={classes.logoContainer}>
                <img alt={"Compras para casa"} src={logo} className={classes.logo}/>
            </Grid>*/}
            <Grid item xs={12}>
                <Typography variant={"h2"} color={"primary"} gutterBottom>
                    {title}
                </Typography>
                {message &&
                <Typography variant={"h6"} gutterBottom>
                    {message}
                </Typography>
                }
            </Grid>
            {props.children}
            <Grid item xs={12} className={classes.gutterBottom}>
            </Grid>
        </Grid>
    );
};

export default ParseStatusMessagePage;
