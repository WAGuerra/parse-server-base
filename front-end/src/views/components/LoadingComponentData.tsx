import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";
import {CircularProgressProps} from '@material-ui/core/CircularProgress/CircularProgress';

interface styleProps {
  spacing?: number
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center",
            padding: (props:styleProps) => `${theme.spacing((props.spacing != null)? props.spacing : 2)}px 0`
        },
    })
);

interface LoadingComponentDataInterface extends styleProps{
}

export const LoadingComponentData: React.ComponentType<CircularProgressProps & LoadingComponentDataInterface> = (props) => {
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <CircularProgress {...props}/>
        </div>
    );
};
