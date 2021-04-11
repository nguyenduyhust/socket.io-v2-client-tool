import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      backgroundColor: theme.colors.whiteSmoke,
    },
    title: {
      flex: 1,
    },
    contentContainer: {
      marginTop: theme.spacing(2),
    },
    tabsPaperWrapper: {
      marginTop: theme.spacing(2),
    },
    tabsPaper: {
      padding: theme.spacing(3),
    },
    tabsRoot: {
      borderBottom: `1px solid ${fade(theme.colors.black, 0.23)}`,
    },
    tabsIndicator: {
      backgroundColor: theme.colors.midnightExpress,
    },
    tabRoot: {
      textTransform: 'none',
      '&$selected': {
        color: theme.colors.midnightExpress,
        fontWeight: theme.typography.fontWeightMedium,
      },
      fontWeight: 'bold',
    },
    tabContent: {
      marginTop: theme.spacing(3),
    },
  });

const useStyles = makeStyles(styles);

export { styles, useStyles };
