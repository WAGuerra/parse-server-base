import {
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import {TableRow} from '@material-ui/core';

export const NoBorderLastLineTableRow = withStyles(() =>
    createStyles({
      root: {
        borderStyle: 'none',
        '&:last-child': {
          '& td': {
            borderStyle: 'none',
          },
        },
      },
    }),
)(TableRow);
