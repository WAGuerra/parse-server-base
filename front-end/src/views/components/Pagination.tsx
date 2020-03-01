import React, {MouseEventHandler} from 'react';
import {
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import PreviousIcon from '@material-ui/icons/ArrowBack';
import NextIcon from '@material-ui/icons/ArrowForward';

interface PaginationInterface {
  page: number,
  totalPages: number,
  onNextPage: MouseEventHandler,
  onPreviousPage: MouseEventHandler
}

const Pagination = (props: PaginationInterface) => {
  const {
    page,
    totalPages,
    onNextPage,
    onPreviousPage,
  } = props;
  
  return (
      <Grid container justify={'space-between'}>
        <Grid item>
          <IconButton
              onClick={onNextPage}
              aria-label={'Página Anterior'}
              disabled={page <= 0}
          >
            <PreviousIcon/>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography>
            Página {page} de {totalPages}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
              onClick={onPreviousPage}
              aria-label={'Página Anterior'}
              disabled={page >= totalPages}
          >
            <NextIcon/>
          </IconButton>
        </Grid>
      </Grid>
  );
};

export default Pagination;
