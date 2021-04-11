import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    tabsRoot: {
      // border: `1px solid ${fade(theme.colors.black, 0.23)}`,
      // padding: theme.spacing(3),
    },
    tabRoot: {
      textTransform: 'none',
    },
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
