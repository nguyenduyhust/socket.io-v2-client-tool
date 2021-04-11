import { fade } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    dialogPaper: {
      width: 500,
    },
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
