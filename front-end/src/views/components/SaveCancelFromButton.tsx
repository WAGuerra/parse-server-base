import React, {
  Fragment,
  MouseEventHandler,
  useState,
} from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      
      button: {
        maxWidth: 200,
      },
      buttonsContainer: {
        marginTop: theme.spacing(4),
      },
    }),
);

interface SaveCancelFromButtonInterface {
  onNavigateBack: MouseEventHandler,
  onDelete?: Function,
  showDelete?: boolean
}

export const SaveCancelFormButton = (props: SaveCancelFromButtonInterface) => {
  const classes = useStyles();
  const {
    onNavigateBack,
    onDelete,
      showDelete =false
  } = props;
  const [open, setOpen] = useState(false);
  
  function handleOpenDialog() {
    setOpen(true);
  }
  
  const handleClose = (deleteItem: boolean) => () => {
    if (deleteItem && onDelete) {
      onDelete();
    }
    setOpen(false);
  };
  
  return (
      <Fragment>
        <Grid container justify={'space-between'}
              spacing={3}
              className={classes.buttonsContainer}>
          <Grid item>
            <Button
                variant={'outlined'}
                color={'primary'}
                type={'submit'}
                size={'large'}
                className={classes.button}
            >
              Salvar
            </Button>
          </Grid>
          {showDelete && onDelete &&
           <Grid item>
             <Button
                 variant={'outlined'}
                 color={'secondary'}
                 type={'button'}
                 size={'large'}
                 startIcon={<DeleteIcon/>}
                 className={classes.button}
                 onClick={handleOpenDialog}
             >
               Apagar
             </Button>
           </Grid>
          }
          <Grid item>
            <Button
                variant={'outlined'}
                color={'default'}
                type={'button'}
                size={'large'}
                className={classes.button}
                onClick={onNavigateBack}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle
              id="alert-dialog-title">Apagar</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja realmente apagar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose(false)} color="primary" autoFocus>
              Não
            </Button>
            <Button onClick={handleClose(true)} color="default">
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
  );
};
