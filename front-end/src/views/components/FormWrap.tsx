import React, {
  FormEvent,
  ReactNode,
} from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      title: {
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(5),
      },
    }),
);

interface FormWrapInterface {
  formTitle?: ReactNode | string
}

/**
 * Wraps a form and centralizes it.
 * The onSubmit function implicitly call e.preventDefault()
 *
 * @param props
 * @constructor
 */
export const FormWrap = (props: FormWrapInterface & React.FormHTMLAttributes<HTMLFormElement>) => {
  const {
    formTitle,
    onSubmit,
    ...formProps
  } = props;
  const classes = useStyles();
  
  let Title: ReactNode | undefined = formTitle && (
      <Typography variant={'h2'} color={'primary'} gutterBottom>
        {formTitle}
      </Typography>
  );
  
  if (typeof formTitle !== 'string') {
    Title = formTitle;
  }
  
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit && onSubmit(e);
  }
  
  return (
      <Grid container justify={'center'}>
        <Grid item xs={12} sm={9} md={6} lg={4}>
          {formTitle &&
           <div className={classes.title}>
             {Title}
           </div>
          }
          <form noValidate onSubmit={handleSubmit} {...formProps}/>
        </Grid>
      </Grid>
  );
};
